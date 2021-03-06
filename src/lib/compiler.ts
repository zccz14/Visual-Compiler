import { backpatch } from './quad';
import Token, * as TokenType from "./token";
import { ISyntaxTree, SyntaxTree } from "./syntax-tree";
import Lexer from "./lex";
import "./syntax";
import Context from "./context";
import Quad from "./quad";

export interface IIntermediate { }

export interface ICompilerError {

}

export class CELex implements ICompilerError {
    constructor(token: Token) {
        this.msg = token.text;
        this.token = token;
    }
    token: Token;
    msg: string;
    toString() {
        return `Lex Error: ${this.msg} (${this.token})`;
    }
}

export class CESyntax implements ICompilerError {
    constructor(msg: string, token: Token) {
        this.msg = msg;
        this.token = token;
    }
    token: Token;
    msg: string;
    toString() {
        return `Syntax Error: ${this.msg} (${this.token})`;
    }
}

export class CESemantic implements ICompilerError {
    constructor(msg: string, tree: ISyntaxTree) {
        this.msg = msg;
        this.tree = tree;
    }
    msg: string;
    tree: ISyntaxTree;
    toString() {
        return `Semantic Error: ${this.msg} (${this.tree})`;
    }
}

export class CompileResult {
    tokens: Token[] = [];
    trees: ISyntaxTree[] = [];
    errors: ICompilerError[] = [];
    context: Context = new Context(null);
    code: IIntermediate[] = [];
}

var sleep = function (time: number) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    })
};

export class Compiler {
    /**
     * @exception no throw
     */
    static compile(text: string): CompileResult {
        let res = new CompileResult();
        text = text || "";
        // Lex
        let ti = Lexer.lex(text);
        while (!ti.isEnded()) {
            if (ti.cur().type === TokenType.ERROR) {
                res.errors.push(new CELex(ti.cur()));
            }
            res.tokens.push(ti.cur());
            ti.accept();
        }
        ti.reset();
        // Syntax
        let st: ISyntaxTree;
        while (!ti.isEnded()) {
            let startAt = ti.cur();
            try {
                st = SyntaxTree.parse(ti);
                res.trees.push(st);
            } catch (e) {
                if (e instanceof TypeError) {
                    console.error(e);
                } else {
                    res.errors.push(e);
                }
            }
            if (startAt === ti.cur()) {
                res.errors.push(new CESyntax('not a start token', ti.cur()));
                ti.accept();
            } else if (!ti.isEnded()) {
                res.errors.push(new CESyntax('compile terminated unexpected', ti.cur()));
            }
        }
        // Semantic
        res.trees.forEach((tree, idx) => {
            try {
                tree.check(res.context);
            } catch (e) {
                res.errors.push(e);
            }
        });
        // Generate
        res.trees.forEach((tree, idx) => {
            try {
                tree.gen(res.code);
                backpatch(<Quad[]>res.code, tree['CHAIN'], res.code.length + 1);
            } catch (e) {
                res.errors.push(e);
            }
        });
        res.code.push(new Quad('exit', '', '', ''));
        return res;
    }
}