/** 
 * Code by Alexander Lobankov (https://gist.github.com/rooks) 
 * Updated by me to map the colors to a default style
 */

const DELIM = ','
const QUOTE = '"'
const MAX_LENGTH = 10

// Style for each max length
const STYLE_LIST = [
    "variable",
    "keyword",
    "attribute",
    "comment",
    "string",
    "def",
    "number",
    "property",
    "builtin",
    "tag"
];

CodeMirror.defineMode('csv', function modeCsv(opts, modeOpts) {
    
    let token = (state) => STYLE_LIST[state.num];

    function tokenMain(stream, state) {
        if (stream.sol()) {
            state.num = 0
        }

        let ch = stream.next()

        if (ch === QUOTE) {
            state.tokenize = tokenQuotes
            return token(state)
        }

        if (ch === DELIM) {  
            state.num = (state.num + 1) % MAX_LENGTH;
            return null;
        }

        return token(state)
    }

    function tokenQuotes(stream, state) {
        let ch = stream.next()
        if (ch === QUOTE) {
            let next = stream.peek()
            // escaped quotaion mark
            if (next === QUOTE) {
                stream.next()
            }
            // end of the record
            else {
                state.tokenize = tokenMain
            }
        }

        return token(state)
    }

    return {
        startState() {
            return {
                num: 0,
                tokenize: tokenMain
            }
        },
        token(stream, state) {            
            return state.tokenize(stream, state);
        }
    }
})