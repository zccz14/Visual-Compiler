import * as React from 'react';
import Code from 'material-ui/svg-icons/action/code';
import LineStyle from 'material-ui/svg-icons/action/line-style';
import List from 'material-ui/svg-icons/action/list';
import TextFormat from 'material-ui/svg-icons/content/text-format';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
export default class Bottom extends React.Component<{ label: string; onChange: (label: string) => void; }, {}> {
    static items = [
        {
            label: 'code',
            icon: <Code />,
        },
        {
            label: 'lex',
            icon: <TextFormat />
        },
        {
            label: 'syntax',
            icon: <LineStyle />
        },
        {
            label: 'intermediate',
            icon: <List />
        },
        {
            label: 'symbol',
            icon: <List />
        }
    ];

    render() {
        const { label, onChange } = this.props;
        return (
            <BottomNavigation
                selectedIndex={Bottom.items.findIndex(v => v.label === label)}
                style={{
                    position: 'fixed',
                    bottom: 0
                }}
            >
                {Bottom.items.map((v, i) =>
                    <BottomNavigationItem
                        key={i}
                        label={v.label.toUpperCase()}
                        icon={v.icon}
                        onTouchTap={() => onChange(v.label)}
                    />
                )}
            </BottomNavigation>
        );
    }
}