<template>
    <div>
        <div class="hero is-light">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title"><i class="material-icons">edit</i>Jira Projekt</h1>
                </div>
                <h2 class="subtitle">
                    Hier kannst du ein Jira Space erstellen</h2>
            </div>
        </div>
            <br>
            <form v-on:submit.prevent="ProjektName">
                <b-field label="Projekt Name"
                         :type="errors.has('Projekt Name') ? 'is-danger' : ''"
                         :message="errors.first('Projekt Name')">
                    <b-input v-model.trim="projektname"
                             name="Projekt Name"
                             v-validate="{ rules: { required: true, regex: /^[a-zA-Z0-9\s]+$/} }">
                    </b-input>
                </b-field>
            </form>
            <form v-on:submit.prevent="ProjectKey">
                <b-field label="Projekt Key"
                         :type="errors.has('Projekt Key') ? 'is-danger' : ''"
                         :message="errors.first('Projekt Key')">
                    <b-input v-model.trim="projektkey"
                             name="Projekt Key"
                             v-validate="{ rules: { required: true, regex: /^[A-Z]{0,10}$/} }">
                    </b-input>
                </b-field>
            </form>
            <form v-on:submit.prevent="ProjektBeschreibung">
                <b-field label="Projekt Beschreibung"
                         :type="errors.has('Projekt Beschreibung') ? 'is-danger' : ''"
                         :message="errors.first('Projekt Beschreibung')">
                    <b-input v-model.trim="projektbeschreibung"
                             name="Projekt Beschreibung">
                    </b-input>
                </b-field>
            </form>
            <form v-on:submit.prevent="BestellungAndererUser">
                <b-field label="Bestellung für anderen User"
                         :type="errors.has('Bestellung für anderen User') ? 'is-danger' : ''"
                         :message="errors.first('Bestellung für anderen User')">
                    <b-input v-model.trim="bestellanduser"
                             name="Bestellung für anderen User"
                             v-validate="{ rules: { required: false, regex:/^(u|U)([0-9]{6})$|^(ue|UE|Ue)([0-9]{5})$/ } }">
                    </b-input>
                </b-field>
            </form>
            <button :disabled="errors.any()"
                    v-bind:class="{'is-loading': loading}"
                    class="button is-primary">Projekt erstellen
            </button>
    </div>

</template>

<script>
    export default {
        name: "j-i-r-a"
    }
</script>
