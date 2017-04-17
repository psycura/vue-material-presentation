<template>
    <md-whiteframe tag="form" class="login-form"
                   novalidate @submit.prevent="wantsToSignUp ? signUpWithPassword() : signInWithPassword()">
        <h1>{{wantsToSignUp ? 'Sign up' : 'Sign in'}}</h1>
        <transition-group enter-active-class="animated slideInDown"
                          leave-active-class="animated fadeOut"
                          appear-active-class=null>
            <md-input-container key="name" v-show="wantsToSignUp">
                <label>Full Name</label>
                <md-input v-model="name" name="name" id="name"></md-input>
            </md-input-container>
            
            <md-input-container :class="{'md-input-invalid':validation.hasError('email')}"
                                key="email">
                <label>Email</label>
                <md-input required v-model="email" name="email" id="email"></md-input>
                <span class="md-error">{{ validation.firstError ( 'email' ) }}</span>
            </md-input-container>
            
            <md-input-container :class="{'md-input-invalid':validation.hasError('password')}"
                                key="password">
                <label>Password</label>
                <md-input required v-model="password" name="password" id="password" type="password"></md-input>
                <span class="md-error">{{ validation.firstError ( 'password' ) }}</span>
            </md-input-container>
            
            <md-input-container v-show="wantsToSignUp"
                                :class="{'md-input-invalid': !passwordIsConfirmed  }"
                                key="confirmPassword">
                <label>Confirm Password</label>
                <md-input required v-model.lazy="confirmPassword" name="confirmPassword"
                          id="confirmPassword" type="password"></md-input>
                <span class="md-error"> Wrong password  </span>
            </md-input-container>
            <div key="btns">
                <md-checkbox id="wantToSignUp" name="wantToSignUp" v-model="wantsToSignUp">I`m a new user</md-checkbox>
                <md-button type="submit" class="md-raised md-primary submit-btn"
                           @click.native="submitForm">
                    {{wantsToSignUp ? 'Sign up' : 'Sign in'}}
                </md-button>
            </div>
        </transition-group>
    
    </md-whiteframe>
</template>

<script>
    import * as auth from '../../actions/auth';
    import { mapActions, mapGetters } from 'vuex';
    
    import SimpleVueValidation from 'simple-vue-validator'
    const Validator = SimpleVueValidation.Validator;
    
    export default{
        data () {
            return {
                email           : '',
                password        : '',
                confirmPassword : '',
                wantsToSignUp   : false,
                name            : '',
                error           : '',
            }
        },
        computed   : {
            formIsValid(){
                return this.$validate ()
            },
            passwordIsConfirmed(){
                if ( this.confirmPassword !== '' ) {
                    return this.password === this.confirmPassword
                } else return true
            }
        },
        validators : {
            email    : ( value ) => {
                return Validator.value ( value ).required ().email ();
            },
            password : ( value ) => {
                return Validator.value ( value ).required ();
            }
        },
        
        methods : {
            ...mapActions ( {
                setMessage : 'setMessage'
            } ),
            submitForm(){
                this.formIsValid.then ( result => {
                    if ( result ) {
                        this.wantsToSignUp ? this.signUpWithPassword () : this.signInWithPassword ();
                    }
                } )
            },
            signUpWithPassword(){
                auth.signUpWithPassword ( this.email, this.password, this.name )
                .then (
                    () => {
                        this.$parent.open ();
                        this.$router.replace ( '/demos' )
                    },
                    () => {
                        this.$parent.open ();
                    } )
            },
            signInWithPassword(){
                auth.signInWithPassword ( this.email, this.password )
                .then (
                    () => {
                        this.$parent.open ();
                        this.$router.replace ( '/demos' )
                    },
                    () => {
                        this.$parent.open ();
                    } )
            }
        }
        
    }

</script>

<style lang="scss" scoped>
    .login-form {
        width:         480px;
        max-width:     100%;
        margin:        25vh auto 15px;
        background:    #fff;
        padding:       15px;
        border-radius: 2px;
        transition:    height .3s cubic-bezier(0.4, 0.0, 0.2, 1);
        overflow:      hidden;
        
    }
    
    .slideInDown {
        position: absolute;
    }
    
    .slideOutUp {
        position: absolute;
    }
    
    .v-move {
        transition: transform .377s;
    }
    
    .submit-btn {
        float: right;
    }
</style>