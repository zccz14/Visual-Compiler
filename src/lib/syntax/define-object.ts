import { SyntaxTreeType, ISyntaxTree } from "../syntax-tree";
import { ITokenIterator } from "../token-iterator";
import DefineArray from "./define-array";
import { IDENTIFIER, DELIMITER } from "../token";
import Context from "../context";
import { IIntermediate } from "../compiler";
/**
 * Define Object ST
 * <Define Object> ::= <Identifier> | <Define Array>
 */
@SyntaxTreeType
export default class DefineObject implements ISyntaxTree {
    gen(list: IIntermediate[]): void {
        throw new Error("Method not implemented.");
    }
    check(context: Context): void {
        throw new Error("Method not implemented.");
    }
    static parse(ts: ITokenIterator): DefineObject {
        let res = new DefineObject();
        if (ts.cur().type === IDENTIFIER) {
            if (ts.peek(1) && ts.peek(1).type === DELIMITER && ts.peek(1).text === '[') {
                // Define Array
                let array = DefineArray.parse(ts);
                res.id = array.id;
                res.array = array.list.list;
            } else {
                res.id = ts.cur().text;
                res.array = [];
                ts.accept();
            }
        } else {
            throw new Error('SyntaxError: Expect basetype');
        }
        return res;
    }
    id: string;
    array: number[] = [];
}
