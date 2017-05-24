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
                        <md-file v-model="image"
                                 accept="image/*"
                                 placeholder="Here can be your image"
                                 @change.native="upload($event)"></md-file>
                    </md-input-container>
                    <md-progress :md-progress="imageUploadProgress"
                                 v-if="uploadInProgress">
                    </md-progress>
                </div>
                <div class="assets">
                    <div class="asset asset-image"
                         @click="selectImage(img)"
                         v-for="img,index in userImgs"
                         :key="`${index}_${img.name}`">
                        <div class="preview-cont">
                            <div class="preview" :style="{backgroundImage: `url(${img.url})`}"></div>
                        </div>
                        <div class="meta">
                            <div class="meta-name">
                                {{img.name}}
                            </div>
                        </div>
                        <md-button class="md-icon-button layer-close md-dense"
                                   @click.native.stop="removeImage(img.name,index)">
                            <md-icon>close</md-icon>
                        </md-button>
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
                image        : null,
            }
        },
        computed : {
            ...mapGetters ( [
                'imageUploadProgress',
                'uploadInProgress',
                'userImgs',
                'selectedImg',
                'selectedImgIndex'
            ] )
        },
        methods  : {
            ...mapActions ( [
                'selectImg',
                'toggleImageManager'
            ] ),
            
            async upload( event ){
                await storageActions.uploadFile ( event.target.files[ 0 ] )
            },
            
            async selectImage( img ){
                await this.selectImg ( img.url );
                this.toggleImageManager ( false );
            },
            
            async removeImage( name, index ){
                await storageActions.deleteImg ( name );
                await dbActions.deleteUserImg ( index );
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
        display:          flex;
        flex-wrap:        wrap;
    }
    
    .asset {
        border-bottom: 1px solid rgba(0, 0, 0, .3);
        padding:       5px;
        cursor:        pointer;
        position:      relative;
        display:       flex;
        flex-wrap:     wrap;
    }
    
    .asset-image {
        border-bottom: none;
        width:         20%;
        height:        150px;
        border-radius: 3px;
        
        &:hover {
            background-color: rgba(255, 255, 255, .2);
        }
    }
    
    .preview-cont {
        height: 100px;
        width:  100%;
        
        .preview {
            background-position: center center;
            background-size:     cover;
            background-repeat:   no-repeat;
            height:              100%;
            width:               100%;
            z-index:             1;
            overflow:            hidden;
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
        /*padding:   5px 0 0 5px;*/
        height:    37px;
        overflow:  hidden;
    }
    
    .layer-close {
        position: absolute !important;
        right:    -6px;
        top:      -1px;
        opacity:  .75;
    }

</style>