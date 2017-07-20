import Intermediate from './Intermediate';
import * as React from 'react';
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Translate from "material-ui/svg-icons/action/translate";
import { connect } from "react-redux";
import Bottom from "../components/Bottom";
import { Dispatch } from "redux";

import Code from "./Code";
import Lex from "./Lex";
import Syntax from "./Syntax";

class Layout extends React.Component<{ dispatch: Dispatch<any>; stage: string; core: { text: string; }; }, {}> {
    render() {
        const { dispatch, stage, core } = this.props;
        const { text } = core;
        return (
            <div>
                <AppBar
                    title="Visual Compiler"
                    iconElementLeft={<IconButton><Translate /></IconButton>}
                    onLeftIconButtonTouchTap={() => dispatch({ type: 'COMPILE', payload: text })}
                    style={{
                        position: 'fixed',
                        top: 0
                    }}
                    />
                <div
                    style={{
                        position: 'relative',
                        padding: '64px 15px'
                    }}
                    >
                    {stage === 'code' ? <Code /> : null}
                    {stage === 'lex' ? <Lex /> : null}
                    {stage === 'syntax' ? <Syntax /> : null}
                    {stage === 'intermediate' ? <Intermediate /> : null}
                </div>
                <Bottom
                    label={stage}
                    onChange={(label: string) => dispatch({ type: 'STAGE_CHANGE', payload: { next: label, prev: stage } })}
                    />
            </div>
        );
    }
}
function select(state: any) {
    return {
        stage: state.stage,
        core: state.core
    }
}
export default connect(select)(Layout);