const components = {
    List              : {
        name          : 'List',
        title         : 'List',
        icon          : 'view_list',
        container     : true,
        accept        : [ 'ListItemContainer' ],
        dropTarget    : '*',
        children      : [],
        defaultStyles : {
            general     : {
                '01_display'  : {
                    value    : 'flex',
                    type     : 'select',
                    editable : true
                },
                '02_position' : {
                    value    : 'relative',
                    type     : 'select',
                    editable : true
                    
                },
                
                '03_top'    : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '04_right'  : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '05_bottom' : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '06_left'   : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
            },
            dimensions  : {
                
                '01_width'   : {
                    value    : '100',
                    type     : 'input',
                    units    : '%',
                    editable : true
                    
                },
                '02_height'  : {
                    value    : '480',
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '03_margin'  : {
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
                '04_padding' : {
                    type    : 'composite',
                    options : {
                        '41_top'    : {
                            type     : 'input',
                            value    : 8,
                            units    : 'px',
                            editable : true
                            
                        },
                        '42_right'  : {
                            type     : 'input',
                            value    : 0,
                            units    : 'px',
                            editable : true
                            
                        },
                        '43_bottom' : {
                            type     : 'input',
                            value    : 8,
                            units    : 'px',
                            editable : true
                            
                        },
                        '44_left'   : {
                            type     : 'input',
                            value    : 0,
                            units    : 'px',
                            editable : true
                            
                        },
                    },
                    
                },
            },
            decorations : {
                '01_color'           : {
                    value    : '#000',
                    type     : 'picker',
                    editable : true
                },
                '02_backgroundColor' : {
                    value    : '#fff',
                    type     : 'picker',
                    editable : true
                    
                },
                '03_borderRadius'    : {
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
                    }
                },
                '04_border'          : {
                    type    : 'composite',
                    options : {
                        '41_borderWidth' : {
                            type     : 'input',
                            value    : '0',
                            units    : 'px',
                            editable : true
                            
                        },
                        '42_borderStyle' : {
                            value    : 'solid',
                            type     : 'select',
                            editable : true
                            
                        },
                        '43_borderColor' : {
                            type     : 'picker',
                            value    : 'black',
                            editable : true
                            
                        }
                    }
                },
                '05_boxShadow'       : {
                    stack    : [],
                    type     : 'stack',
                    editable : true
                },
                '06_background'      : {
                    type     : 'stack',
                    stack    : [],
                    editable : true
                }
            }
        },
        
    },
    ListItemContainer : {
        name          : 'ListItemContainer',
        title         : 'List Item Container',
        icon          : 'insert_link',
        container     : true,
        accept        : '*',
        dropTarget    : [ 'List' ],
        children      : [],
        defaultStyles : {
            general     : {
                '01_display'  : {
                    value    : 'flex',
                    type     : 'select',
                    editable : true
                    
                },
                '02_position' : {
                    value    : 'relative',
                    type     : 'select',
                    editable : true
                    
                },
                
                '03_top'    : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '04_right'  : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '05_bottom' : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '06_left'   : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
            },
            dimensions  : {
                
                '01_width'   : {
                    value    : '100',
                    type     : 'input',
                    units    : '%',
                    editable : false
                    
                },
                '02_height'  : {
                    value    : '88',
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '03_margin'  : {
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
                '04_padding' : {
                    type    : 'composite',
                    options : {
                        '41_top'    : {
                            type     : 'input',
                            value    : 8,
                            units    : 'px',
                            editable : true
                            
                        },
                        '42_right'  : {
                            type     : 'input',
                            value    : 0,
                            units    : 'px',
                            editable : true
                            
                        },
                        '43_bottom' : {
                            type     : 'input',
                            value    : 8,
                            units    : 'px',
                            editable : true
                            
                        },
                        '44_left'   : {
                            type     : 'input',
                            value    : 0,
                            units    : 'px',
                            editable : true
                            
                        },
                    },
                    
                },
            },
            decorations : {
                '01_color'           : {
                    value    : '#000',
                    type     : 'picker',
                    editable : true
                    
                },
                '02_backgroundColor' : {
                    value    : '#fff',
                    type     : 'picker',
                    editable : true
                    
                },
                '03_borderRadius'    : {
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
                    }
                },
                '04_border'          : {
                    type    : 'composite',
                    options : {
                        '41_borderWidth' : {
                            type     : 'input',
                            value    : '0',
                            units    : 'px',
                            editable : true
                            
                        },
                        '42_borderStyle' : {
                            value    : 'solid',
                            type     : 'select',
                            editable : true
                            
                        },
                        '43_borderColor' : {
                            type     : 'picker',
                            value    : 'black',
                            editable : true
                            
                        }
                    }
                },
                '05_boxShadow'       : {
                    stack    : [],
                    type     : 'stack',
                    editable : true
                },
                '06_background'      : {
                    type     : 'stack',
                    stack    : [],
                    editable : true
                }
            }
        },
        
    },
    Container         : {
        name          : 'Container',
        title         : 'Container',
        icon          : 'aspect_ratio',
        container     : true,
        accept        : '*',
        dropTarget    : '*',
        children      : [],
        defaultStyles : {
            general     : {
                '01_display'  : {
                    value    : 'flex',
                    type     : 'select',
                    editable : true
                    
                },
                '02_position' : {
                    value    : 'relative',
                    type     : 'select',
                    editable : true
                    
                },
                
                '03_top'    : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '04_right'  : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '05_bottom' : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '06_left'   : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
            },
            dimensions  : {
                
                '01_width'   : {
                    value    : '360',
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '02_height'  : {
                    value    : '480',
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '03_margin'  : {
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
                '04_padding' : {
                    type    : 'composite',
                    options : {
                        '41_top'    : {
                            type     : 'input',
                            value    : 8,
                            units    : 'px',
                            editable : true
                            
                        },
                        '42_right'  : {
                            type     : 'input',
                            value    : 0,
                            units    : 'px',
                            editable : true
                            
                        },
                        '43_bottom' : {
                            type     : 'input',
                            value    : 8,
                            units    : 'px',
                            editable : true
                            
                        },
                        '44_left'   : {
                            type     : 'input',
                            value    : 0,
                            units    : 'px',
                            editable : true
                            
                        },
                    },
                    
                },
            },
            decorations : {
                '01_color'           : {
                    value    : '#000',
                    type     : 'picker',
                    editable : true
                    
                },
                '02_backgroundColor' : {
                    value    : '#fff',
                    type     : 'picker',
                    editable : true
                    
                },
                '03_borderRadius'    : {
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
                    }
                },
                '04_border'          : {
                    type    : 'composite',
                    options : {
                        '41_borderWidth' : {
                            type     : 'input',
                            value    : '1',
                            units    : 'px',
                            editable : true
                            
                        },
                        '42_borderStyle' : {
                            value    : 'solid',
                            type     : 'select',
                            editable : true
                            
                        },
                        '43_borderColor' : {
                            type     : 'picker',
                            value    : '#ccc',
                            editable : true
                            
                        }
                    }
                },
                '05_boxShadow'       : {
                    stack    : [],
                    type     : 'stack',
                    editable : true
                },
                '06_background'      : {
                    type     : 'stack',
                    stack    : [],
                    editable : true
                }
            }
        }
    },
    TextField         : {
        name          : 'TextField',
        title         : 'TextField',
        icon          : 'font_download',
        container     : false,
        text          : '',
        accept        : '*',
        dropTarget    : '*',
        children      : [],
        defaultStyles : {
            general     : {
                '01_display'  : {
                    value    : 'inline',
                    type     : 'select',
                    editable : true
                    
                },
                '02_position' : {
                    value    : 'relative',
                    type     : 'select',
                    editable : true
                    
                },
                
                '03_top'    : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '04_right'  : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '05_bottom' : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '06_left'   : {
                    value    : 0,
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
            },
            dimensions  : {
                
                '01_width'   : {
                    value    : '100',
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '02_height'  : {
                    value    : '50',
                    type     : 'input',
                    units    : 'px',
                    editable : true
                    
                },
                '03_margin'  : {
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
                '04_padding' : {
                    type    : 'composite',
                    options : {
                        '41_top'    : {
                            type     : 'input',
                            value    : 8,
                            units    : 'px',
                            editable : true
                            
                        },
                        '42_right'  : {
                            type     : 'input',
                            value    : 8,
                            units    : 'px',
                            editable : true
                            
                        },
                        '43_bottom' : {
                            type     : 'input',
                            value    : 8,
                            units    : 'px',
                            editable : true
                            
                        },
                        '44_left'   : {
                            type     : 'input',
                            value    : 8,
                            units    : 'px',
                            editable : true
                            
                        },
                    },
                    
                },
            },
            decorations : {
                '02_backgroundColor' : {
                    value    : 'transparent',
                    type     : 'picker',
                    editable : true
                    
                },
                '03_borderRadius'    : {
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
                    }
                },
                '04_border'          : {
                    type    : 'composite',
                    options : {
                        '41_borderWidth' : {
                            type     : 'input',
                            value    : '1',
                            units    : 'px',
                            editable : true
                            
                        },
                        '42_borderStyle' : {
                            value    : 'solid',
                            type     : 'select',
                            editable : true
                            
                        },
                        '43_borderColor' : {
                            type     : 'picker',
                            value    : '#ccc',
                            editable : true
                            
                        }
                    }
                },
                '05_boxShadow'       : {
                    stack    : [],
                    type     : 'stack',
                    editable : true
                },
                '06_background'      : {
                    type     : 'stack',
                    stack    : [],
                    editable : true
                }
            },
            typography  : {
                '01_fontFamily'     : {
                    value    : 'Roboto',
                    type     : 'select',
                    editable : true
                },
                '02_fontSize'       : {
                    value    : '14',
                    type     : 'input',
                    editable : true,
                    units    : 'px'
                },
                '03_fontWeight'     : {
                    value    : '400',
                    type     : 'select',
                    editable : true
                },
                '04_letterSpacing'  : {
                    value    : '1',
                    type     : 'input',
                    units    : 'px',
                    editable : true
                },
                '05_color'          : {
                    value    : '#000',
                    type     : 'picker',
                    editable : true
                },
                '06_lineHeight'     : {
                    value    : '1',
                    type     : 'input',
                    units    : 'px',
                    editable : true
                },
                '07_textAlign'      : {
                    value    : 'left',
                    type     : 'radio',
                    editable : true
                },
                '08_textDecoration' : {
                    value    : 'none',
                    type     : 'radio',
                    editable : true
                },
                '09_textShadow'     : {
                    stack    : [],
                    type     : 'stack',
                    editable : true
                },
                
            }
        }
    }
};

export { components };