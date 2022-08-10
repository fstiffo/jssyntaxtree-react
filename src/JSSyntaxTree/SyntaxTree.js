import React, { useState, useEffect, useRef } from 'react';

import Tree from "./tree.js";

import * as Parser from "./parser.js";
import * as Tokenizer from "./tokenizer.js";


function SyntaxTree(props) {
    const [phrase, setPhrase] = useState(props.phrase);
    const [font, setFont] = useState(props.font);
    const [fontsize, setFontsize] = useState(props.fontsize);
    const [triangles, setTriangles] = useState(props.triangles);
    const [nodecolor, setNodecolor] = useState(props.nodecolor);
    const [autosub, setAutosub] = useState(props.autosub);
    const [bottom, setBottom] = useState(props.bottom);
    const [parseerror, setParseerror] = useState("");


    const ref = useRef();

    const [canvas, setCanvas] = useState(null);
    const [tree, setTree] = useState(tree)
    useEffect(() => {
        const canvas = ref.current;
        setCanvas(canvas);
        const tree = new Tree();
        tree.setCanvas(canvas);
        setTree(tree);
        console.log("Canvas and tree setup");
        // do something here with the canvas
    }, [canvas])


    useEffect(() => {
        try {
            console.log(`Phrase: ${phrase}`);
            const tokens = Tokenizer.tokenize(phrase);
            validateTokens(tokens);

            const syntax_tree = Parser.parse(tokens);
            tree.draw(syntax_tree);
        } catch (err) {
            setParseerror(err)
        }
    });

    const validateTokens = (tokens) => {
        if (tokens.length < 3) throw "Phrase too short";
        if (
            tokens[0].type != Tokenizer.TokenType.BRACKET_OPEN ||
            tokens[tokens.length - 1].type != Tokenizer.TokenType.BRACKET_CLOSE
        )
            throw "Phrase must start with [ and end with ]";
        const brackets = countOpenBrackets(tokens);
        if (brackets > 0) throw brackets + " bracket(s) open [";
        if (brackets < 0) throw Math.abs(brackets) + " too many closed bracket(s) ]";
        return null;
    };

    const countOpenBrackets = (tokens) => {
        let o = 0;
        for (const token of tokens) {
            if (token.type == Tokenizer.TokenType.BRACKET_OPEN) ++o;
            if (token.type == Tokenizer.TokenType.BRACKET_CLOSE) --o;
        }
        return o;
    };

    return (
        <div className="SyntaxTree">
            <canvas ref={ref} />
            <span id="parse-error">{parseerror}</span>
        </div>
    );
}

SyntaxTree.defaultProps = {
    phrase: "[S [NP jsSyntaxTree][VP [V creates] NP nice syntax trees ->#1]]",
    font: "sans-serif",
    fontsize: 16,
    triangles: true,
    nodecolor: true,
    autosub: true,
    bottom: false,
    spacing: 100,
}

export default SyntaxTree;