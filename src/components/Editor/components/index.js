import List from './List.vue';

const components = {
    List : {
        name          : 'List',
        component     : List,
        icon          : 'view_list',
        defaultStyles : {
            general     : {
                display  : {
                    value : 'block',
                    type  : 'select',
                },
                position : {
                    value : 'relative',
                    type  : 'select',
                },
                
                top    : {
                    value : 0,
                    type  : 'input',
                    units : 'px'
                },
                right  : {
                    value : 0,
                    type  : 'input',
                    units : 'px'
                },
                bottom : {
                    value : 0,
                    type  : 'input',
                    units : 'px'
                },
                left   : {
                    value : 0,
                    type  : 'input',
                    units : 'px'
                },
            },
            dimensions  : {
                
                width   : {
                    value : '360',
                    type  : 'input',
                    units : 'px'
                },
                height  : {
                    value : '480',
                    type  : 'input',
                    units : 'px'
                },
                margin  : {
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
                padding : {
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
                color : {
                    value : '#000',
                    type  : 'picker'
                },
                backgroundColor : {
                    value : '#fff',
                    type  : 'picker'
                },
                borderRadius    : {
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
                    }
                },
                border          : {
                    type    : 'composite',
                    options : {
                        borderWidth : {
                            type  : 'input',
                            value : '0',
                            units : 'px'
                        },
                        borderStyle : {
                            value : 'solid',
                            type  : 'select',
                        },
                        borderColor : {
                            type  : 'picker',
                            value : 'black',
                        }
                    }
                }
            }
        },
        
    }
    
};

export  { components };