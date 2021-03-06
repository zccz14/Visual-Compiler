import * as React from "react";
import { connect } from "react-redux";
import JSONTree from "react-json-tree";
import { Dispatch } from "redux";

const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
};

class SymbolTable extends React.Component<{ dispatch: Dispatch<any>, data: {}[] }, {}> {
    render() {
        console.log(this.props.data);
        return (
            <JSONTree
                data={this.props.data}
                theme={theme}
                invertTheme={true}
                shouldExpandNode={() => true}
            />
        );
    }
}

const select = (state: any) => ({ data: state.core.context });

export default connect(select)(SymbolTable);