const canvas = {
    name          : 'Canvas',
    styles        : {},
    defaultStyles : {
        general     : {
            display : {
                value : 'flex',
                type  : 'select',
            },
        },
        dimensions  : {
            width    : {
                value : '100',
                type  : 'input',
                units : '%'
            },
            height   : {
                value : '100',
                type  : 'input',
                units : '%'
            },
            paddings : {
                type    : 'composite',
                options : {
                    top    : {
                        type  : 'input',
                        value : 0,
                        units : 'px'
                    },
                    right  : {
                        type  : 'input',
                        value : 0,
                        units : 'px'
                    },
                    bottom : {
                        type  : 'input',
                        value : 0,
                        units : 'px'
                    },
                    left   : {
                        type  : 'input',
                        value : 0,
                        units : 'px'
                    },
                },
                
            },
        },
        decorations : {
            backgroundColor : {
                value : '#fff',
                type  : 'picker'
            },
            border          : {
                type    : 'composite',
                options : {
                    borderWidth : {
                        value : '1',
                        units : 'px',
                        type  : 'input',
                        
                    },
                    borderStyle : {
                        type  : 'select',
                        value : 'solid',
                    },
                    borderColor : {
                        type  : 'picker',
                        value : '#ccc',
                    }
                }
            }
        },
        flex        : {
            flexDirection  : {
                type  : 'select',
                value : 'row',
            },
            justifyContent : {
                type  : 'select',
                value : 'flex-start',
            },
            alignItems     : {
                type  : 'select',
                value : 'flex-start',
            },
            alignContent   : {
                type  : 'select',
                value : 'center',
            }
        }
    }
};

export { canvas };