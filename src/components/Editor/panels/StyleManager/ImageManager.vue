<template>
    <div>
        <div class="mdl-header">
            <div class="mdl-title">Select Image</div>
        </div>
        <div class="mdl-content">
            <div class="im-file-uploader">
                <md-input-container>
                    <label>Drop files here or click to upload</label>
                    <md-file v-model="image"></md-file>
                </md-input-container>
            </div>
            <div class="assets-control">
                <div class="assets-header">
                    <md-input-container>
                        <md-file v-model="image" placeholder="Here can be your image"
                                 @change.native="upload($event)"></md-file>
                    </md-input-container>
                </div>
                <div class="assets">
                    <div class="asset asset-image">
                        <div class="preview-cont">
                            <div class="preview"></div>
                            <div class="preview-bg"></div>
                        </div>
                        <div class="meta"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import * as dbActions from '../../../../actions/db';
    import * as storageActions from '../../../../actions/storage';
    
    export default {
        data(){
            return {
                single       : null,
                placeholder  : null,
                initialValue : 'my-profile-picture.jpg',
                multiple     : null,
                onlyImages   : null,
                image        : null
            }
        },
        methods : {
            upload( event ){
//              console.log(event.target.files[0]);
                storageActions.uploadFile ( event.target.files[ 0 ] )
            }
        },
    }

</script>

<style lang="scss" scoped>
    .mdl-header {
        position:      relative;
        border-bottom: 1px solid rgba(0, 0, 0, .3);
        padding:       15px 15px 7px;
    }
    
    .mdl-title {
    
    }
    
    .mdl-content {
        display:         flex;
        align-items:     flex-start;
        justify-content: space-between;
        padding-top:     10px;
    }
    
    .im-file-uploader {
        width: 53%;
        
        .md-input-container {
            background-color: rgba(0, 0, 0, .1);
            border:           2px dashed;
            border-radius:    3px;
            position:         relative;
            text-align:       center;
            margin-bottom:    15px;
            
            label {
                position: absolute;
                padding:  150px 10px;
                width:    100%;
            }
            
            .md-file {
                opacity: 0;
                padding: 150px 10px;
                width:   100%;
            }
        }
    }
    
    .assets-control {
        height:           387px;
        background-color: rgba(0, 0, 0, .1);
        border-radius:    3px;
        box-sizing:       border-box;
        padding:          10px;
        width:            45%;
        overflow:         hidden;
    }
    
    .assets-header {
        padding: 5px;
    }
    
    .assets {
        height:           345px;
        background-color: rgba(0, 0, 0, 0.1);
        padding:          5px;
        margin:           0 -10px;
        overflow:         auto;
        
        .md-input-container {
        
        }
    }
    
    .asset {
        border-bottom: 1px solid rgba(0, 0, 0, .3);
        padding:       5px;
        cursor:        pointer;
        position:      relative;
    }
    
    .asset-image {
        border-bottom: none;
        width:         20%;
        height:        150px;
        border-radius: 3px;
        overflow:      hidden;
    }
    
    .preview-cont {
        height: 100px;
        width:  100%;
        
        .preview {
            position:            absolute;
            background-position: center center;
            background-size:     cover;
            background-repeat:   no-repeat;
            height:              100%;
            width:               100%;
            z-index:             1;
        }
        
        .preview-bg {
            position: absolute;
            height:   100%;
            width:    100%;
            opacity:  .5;
            z-index:  0;
        }
    }
    
    .meta {
        width:     100%;
        font-size: 12px;
        padding:   5px 0 0 5px;
    }

</style>