const listOptions = {
    '01_display'        : [
        { label : 'Block', value : 'block' },
        { label : 'Flex', value : 'flex' },
        { label : 'None', value : 'none' },
    ],
    '02_position'       : [
        { label : 'Relative', value : 'relative' },
        { label : 'Absolute', value : 'absolute' },
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
    '05_flexWrap'       : [
        { label : 'nowrap', value : 'nowrap' },
        { label : 'wrap', value : 'wrap' },
        { label : 'wrap-reverse', value : 'wrap-reverse' },
    ],
    '01_fontFamily'     : [
        { label : 'Roboto', value : 'Roboto' },
        { label : 'cursive', value : 'cursive' },
        { label : 'fantasy', value : 'fantasy' },
        { label : 'monospace', value : 'monospace' },
        { label : 'sans-serif', value : 'sans-serif' },
        { label : 'serif', value : 'serif' },
    ],
    '03_fontWeight'     : [
        { label : 'Thin', value : '100' },
        { label : 'Extra-light', value : '200' },
        { label : 'Light', value : '300' },
        { label : 'Normal', value : '400' },
        { label : 'Medium', value : '500' },
        { label : 'Semi-bold', value : '600' },
        { label : 'Bold', value : '700' },
        { label : 'Extra-bold', value : '800' },
        { label : 'Ultra-bold', value : '900' },
    ],
    '07_textAlign'      : [
        { label : 'Left', value : 'left', icon : 'format_align_left' },
        { label : 'Center', value : 'center', icon : 'format_align_center' },
        { label : 'Right', value : 'right', icon : 'format_align_right' },
        { label : 'Justify', value : 'justify', icon : 'format_align_justify' },
    ],
    '08_textDecoration' : [
        { label : 'None', value : 'none', icon : 'close' },
        { label : 'Underline', value : 'underline', icon : 'format_underlined' },
        { label : 'Line-through', value : 'line-through', icon : 'format_strikethrough' },
    ],
    '06_shadowType'     : [
        { label : 'Outside', value : '' },
        { label : 'Inside', value : 'inset' },
    ],
    '02_repeat':[
        { label : 'repeat', value : 'repeat' },
        { label : 'repeat-x', value : 'repeat-x' },
        { label : 'repeat-y', value : 'repeat-y' },
        { label : 'no-repeat', value : 'no-repeat' },
    ],
    '04_position':[
        { label : 'left top', value : 'left top' },
        { label : 'left center', value : 'left center' },
        { label : 'left bottom', value : 'left bottom' },
        { label : 'right top', value : 'right top' },
        { label : 'right center', value : 'right center' },
        { label : 'right bottom', value : 'right bottom' },
        { label : 'center top', value : 'center top' },
        { label : 'center center', value : 'center center' },
        { label : 'center bottom', value : 'center bottom' },
    ],
    '03_attachment':[
        { label : 'scroll', value : 'scroll' },
        { label : 'fixed', value : 'fixed' },
        { label : 'local', value : 'local' },
    ],
    '05_size':[
        { label : 'auto', value : 'auto' },
        { label : 'cover', value : 'cover' },
        { label : 'contain', value : 'contain' },
    ]
};

export { listOptions }