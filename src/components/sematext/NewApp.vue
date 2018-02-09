<template>
    <div>
        <div class="hero is-light">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title"><i class="material-icons">timeline</i> Sematext Logsene App anlegen</h1>
                </div>
                <h2 class="subtitle">
                    Hier kannst du eine Sematext Logsene App erstellen</h2>
            </div>
        </div>
        <br>
        <form v-on:submit.prevent="newLogseneApp">
            <b-field label="App-Name"
                     :type="errors.has('App-Name') ? 'is-danger' : ''"
                     :message="errors.first('App-Name')">
                <b-input v-model.trim="appName"
                         name="App-Name"
                         v-validate="{ rules: { required: true, regex: /^[a-z0-9]([-a-z0-9]*[a-z0-9])$/} }"
                         placeholder="projekt">
                </b-input>
            </b-field>

            <b-message type="is-info">
                Sematext Logsene Pläne siehe: <a href="https://confluence.sbb.ch/x/AisiMg">Log-Management Kosten</a><br/>
                - Die max. MB pro Tag sind vom Plan abhängig.<br/>
                - Man sollte den Plan so wählen, dass die effektive Logmenge knapp unter dem "Default MB" vom Plan ist.<br/>
                - Die tägliche MB-Limite so erhöhen, dass die tägliche Menge etwas darunter liegt (Puffer).<br/>
                - Grund: Das was im Plan enthalten ist bezahlt man immer komplett, egal ob man es ausschöpft!<br/>
            </b-message>

            <b-field label="Logsene-Plan"
                     :type="errors.has('Logsene-Plan') ? 'is-danger' : ''"
                     :message="errors.first('Logsene-Plan')">

                <b-select placeholder="Wähle den neuen Sematext Logsene Plan aus"
                          :loading="loading"
                          v-model="planId"
                          @input="updateLimit()"
                          required>
                    <option
                            v-for="plan in plans"
                            :value="plan.planId"
                            :key="plan.name">
                        {{ plan.name }}, {{ plan.pricePerMonth }}$, Default MB: {{ plan.defaultDailyMaxLimitSizeMb }}
                    </option>
                </b-select>
            </b-field>

            <b-field label="Täglich MB Limite"
                     :type="errors.has('Limite') ? 'is-danger' : ''"
                     :message="errors.first('Limite')">
                <b-input v-model.trim="limit"
                         name="Limite"
                         v-validate="'required'">
                </b-input>
            </b-field>

            <b-field label="Name vom Projekt"
                     :type="errors.has('Projekt') ? 'is-danger' : ''"
                     :message="errors.first('Projekt')">
                <b-input v-model.trim="project"
                         name="Projekt"
                         v-validate="'required'">
                </b-input>
            </b-field>

            <b-field label="Neue Kontierungsnummer"
                     :type="errors.has('Kontierungsnummer') ? 'is-danger' : ''"
                     :message="errors.first('Kontierungsnummer')">
                <b-input v-model.trim="billing"
                         name="Kontierungsnummer"
                         v-validate="'required'">
                </b-input>
            </b-field>

            <button :disabled="errors.any()"
                    v-bind:class="{'is-loading': loading}"
                    class="button is-primary">Logsene App erstellen
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                plans: [],
                appName: '',
                project: '',
                planId: '',
                limit: '',
                billing: '',
                loading: false
            };
        },
        mounted: function () {
            this.getAppPlans();
        },
        methods: {
            updateLimit: function() {
                if (this.planId) {
                    this.plans.forEach(p => {
                        if (p.planId === this.planId) {
                            this.limit = p.defaultDailyMaxLimitSizeMb;
                        }
                    });
                }
            },
            getAppPlans: function () {
                this.loading = true;
                this.$http.get(this.$store.state.backendURL + '/api/sematext/plans').then((res) => {
                    this.loading = false;
                    this.plans = res.body;
                }, () => {
                    this.loading = false;
                });
            },
            newLogseneApp: function() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.loading = true;

                        this.$http.post(this.$store.state.backendURL + '/api/sematext/logsene', {
                            appName: this.appName,
                            billing: this.billing,
                            planId: this.planId,
                            limit: parseInt(this.limit),
                            project: this.project
                        }).then(() => {
                            this.loading = false;
                        }, () => {
                            this.loading = false;
                        });
                    }
                });
            }
        }
    };
</script>