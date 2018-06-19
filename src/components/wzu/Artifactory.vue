<template>
    <div>
        <div class="hero is-light">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title"><i class="material-icons">edit</i>Artifactory Repository</h1>
                </div>
                <h2 class="subtitle">
                    Hier kannst du ein Artifactory Repository erstellen</h2>
            </div>
        </div>
        <br>
        <form v-on:submit.prevent="newArtifactoryRepository">
            <b-field label="Repository Name"
                     :type="errors.has('Repository Name') ? 'is-danger' : ''"
                     :message="errors.first('Repository Name')">
                <b-input v-model.trim="repository"
                         name="Repository Name"
                         ref="autofocus"
                         v-validate="{ rules: { required: true, regex: /^[a-z0-9]+$/} }">
                </b-input>
            </b-field>
            <label class="label">Repository Typ</label>
            <b-field>
                <b-radio-button v-model="type"
                                native-value="maven"
                                type="is-success">
                    <span>Maven (Java)</span>
                </b-radio-button>
                <b-radio-button v-model="type"
                                native-value="docker"
                                type="is-success">
                    <span>Docker</span>
                </b-radio-button>
                <b-radio-button v-model="type"
                                native-value="npm"
                                type="is-success">
                    <span>NPM</span>
                </b-radio-button>
            </b-field>
            <b-field label="Bestellung für anderen User"
                     :type="errors.has('Bestellung für anderen User') ? 'is-danger' : ''"
                     :message="errors.first('Bestellung für anderen User')">
                <b-input v-model.trim="owner"
                         name="Bestellung für anderen User"
                         v-validate="{ rules: { required: false, regex:/^(u|U)([0-9]{6})$|^(ue|UE|Ue)([0-9]{5})$/ } }">
                </b-input>
            </b-field>
            <button :disabled="errors.any()"
                    v-bind:class="{'is-loading': loading}"
                    class="button is-primary">Repository erstellen
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                repository: '',
                type: '',
                owner: '',
                loading: false
            };
        },
        methods: {
            newArtifactoryRepository: function () {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.loading = true;

                        this.$http.post(this.$store.state.wzuURL + '/api/artifactory/createRepository', {
                            repositoryKey: this.repository,
                            repositoryType: this.type,
                            owner: this.owner
                        }).then(() => {
                            this.loading = false;
                        }, () => {
                            this.loading = false;
                        });
                    }
                });
            }
        }
    }
</script>
