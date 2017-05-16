const listOptions = {
    '01_display'        : [
        { label : 'Block', value : 'block' },
        { label : 'Flex', value : 'flex' },
        { label : 'Inline', value : 'inline' },
        { label : 'Inline-block', value : 'inline-block' },
        { label : 'None', value : 'none' },
    ],
    '02_position'       : [
        { label : 'Relative', value : 'relative' },
        { label : 'Absolute', value : 'absolute' },
        { label : 'Fixed', value : 'fixed' },
    ],
    '42_borderStyle'    : [
        { label : 'Solid', value : 'solid' },
        { label : 'Dashed', value : 'dashed' },
        { label : 'Dotted', value : 'dotted' },
        { label : 'Double', value : 'double' },
        { label : 'Groove', value : 'groove' },
        { label : 'Ridge', value : 'ridge' },
        { label : 'Inset', value : 'inset' },
        { label : 'Outset', value : 'outset' },
    ],
    '01_flexDirection'  : [
        { label : 'Row', value : 'row' },
        { label : 'Row-reverse', value : 'row-=reverse' },
        { label : 'Column', value : 'column' },
        { label : 'Column-reverse', value : 'column-reverse' },
    ],
    '02_justifyContent' : [
        { label : 'Flex-start', value : 'flex-start' },
        { label : 'Flex-end', value : 'flex-end' },
        { label : 'Space-between', value : 'space-between' },
        { label : 'Space-around', value : 'space-around' },
        { label : 'Center', value : 'center' }
    ],
    '03_alignItems'     : [
        { label : 'Flex-start', value : 'flex-start' },
        { label : 'Flex-end', value : 'flex-end' },
        { label : 'Center', value : 'center' },
        { label : 'Stretch', value : 'stretch' },
        { label : 'Baseline', value : 'baseline' },
    ],
    '04_alignContent'   : [
        { label : 'Flex-start', value : 'flex-start' },
        { label : 'Flex-end', value : 'flex-end' },
        { label : 'Center', value : 'center' },
        { label : 'Space-between', value : 'space-between' },
        { label : 'Space-around', value : 'space-around' },
    ],
    '05_flexWrap':[
        {label:'nowrap',value:'nowrap'},
        {label:'wrap',value:'wrap'},
        {label:'wrap-reverse',value:'wrap-reverse'},
    ]
};

export { listOptions }