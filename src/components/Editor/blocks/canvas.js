const canvas = {
    name          : 'Canvas',
    container     : true,
    accept        : '*',
    children      : [],
    styles        : {},
    defaultStyles : {
        general     : {
            '01_display' : {
                value    : 'flex',
                type     : 'select',
                editable : true
            },
            '02_position' : {
                value    : 'relative',
                type     : 'select',
                editable : false
        
            },
        },
        dimensions  : {
            '01_width'    : {
                value    : '100',
                type     : 'input',
                units    : '%',
                editable : false
                
            },
            '02_height'   : {
                value    : '100',
                type     : 'input',
                units    : '%',
                editable : false
                
            },
            '03_padding' : {
                type    : 'composite',
                options : {
                    '31_top'    : {
                        type     : 'input',
                        value    : 0,
                        units    : 'px',
                        editable : true
                        
                    },
                    '32_right'  : {
                        type     : 'input',
                        value    : 0,
                        units    : 'px',
                        editable : true
                        
                    },
                    '33_bottom' : {
                        type     : 'input',
                        value    : 0,
                        units    : 'px',
                        editable : true
                        
                    },
                    '34_left'   : {
                        type     : 'input',
                        value    : 0,
                        units    : 'px',
                        editable : true
                        
                    },
                },
                
            },
        },
        decorations : {
            '01_backgroundColor' : {
                value    : '#fff',
                type     : 'picker',
                editable : true
                
            },
            '04_border'          : {
                type    : 'composite',
                options : {
                    '21_borderWidth' : {
                        value    : '1',
                        units    : 'px',
                        type     : 'input',
                        editable : true
                        
                    },
                    '42_borderStyle' : {
                        type     : 'select',
                        value    : 'solid',
                        editable : true
                        
                    },
                    '23_borderColor' : {
                        type     : 'picker',
                        value    : '#ccc',
                        editable : true
                    }
                }
            },
            '06_background'      : {
                type     : 'stack',
                stack    : [],
                editable : true
            }
        },
        flex        : {
            '01_flexDirection'  : {
                type     : 'select',
                value    : 'row',
                editable : true
                
            },
            '02_justifyContent' : {
                type     : 'select',
                value    : 'flex-start',
                editable : true
                
            },
            '03_alignItems'     : {
                type     : 'select',
                value    : 'flex-start',
                editable : true
                
            },
            '04_alignContent'   : {
                type     : 'select',
                value    : 'flex-start',
                editable : true
                
            },
            '05_flexWrap'       : {
                type     : 'select',
                value    : 'wrap',
                editable : false
            }
        }
    }
};

export { canvas };