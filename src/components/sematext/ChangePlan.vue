<template>
    <div>
        <div class="hero is-light">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title"><i class="material-icons">attach_money</i> Sematext Logsene-App Plan & MB-Limite anpassen
                    </h1>
                </div>
                <h2 class="subtitle">
                    Hier kannst du den Plan und die MB-Limite deiner Sematext Logsene App anpassen</h2>
            </div>
        </div>
        <br>
        <form v-on:submit.prevent="updateSematextPlanAndLimits">
            <b-field label="Logsene-App"
                     :type="errors.has('Logsene-App') ? 'is-danger' : ''"
                     :message="errors.first('Logsene-App')">

                <b-select placeholder="Wähle die App aus"
                          :loading="loading"
                          v-model="appId"
                          required>
                    <option
                            v-for="app in apps"
                            :value="app.appId"
                            :key="app.name">
                        {{ app.name }}, Aktueller Plan: {{ app.planName }}, {{ app.pricePerMonth }}$
                    </option>
                </b-select>
            </b-field>

            <b-message type="is-info">
                Sematext Logsene Pläne siehe: <a href="https://confluence.sbb.ch/x/AisiMg">Log-Management Kosten</a><br/>
                - Die max. MB pro Tag sind vom Plan abhängig.<br/>
                - Man sollte den Plan so wählen, dass die effektive Logmenge knapp unter dem "Default MB" vom Plan ist.<br/>
                - Die tägliche MB-Limite so erhöhen, dass die tägliche Menge etwas darunter liegt (Puffer).<br/>
                - Grund: Das was im Plan enthalten ist bezahlt man immer komplett, egal ob man es ausschöpft!<br/>
            </b-message>

            <b-field label="Neuer Logsene-Plan"
                     :type="errors.has('Neuer Logsene-Plan') ? 'is-danger' : ''"
                     :message="errors.first('Neuer Logsene-Plan')">

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

            <b-field label="Neue täglich MB Limite"
                     :type="errors.has('Limite') ? 'is-danger' : ''"
                     :message="errors.first('Limite')">
                <b-input v-model.trim="limit"
                         name="Limite"
                         v-validate="'required'">
                </b-input>
            </b-field>

            <button :disabled="errors.any()"
                    v-bind:class="{'is-loading': loading}"
                    class="button is-primary">Auswahl speichern
            </button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                apps: [],
                plans: [],
                appId: '',
                planId: '',
                limit: '',
                loading: false
            };
        },
        mounted: function () {
            this.getUsersApps();
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
            getUsersApps: function () {
                this.loading = true;
                this.$http.get(this.$store.state.backendURL + '/api/sematext/logsene').then((res) => {
                    this.loading = false;
                    this.apps = res.body;
                }, () => {
                    this.loading = false;
                });
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
            updateSematextPlanAndLimits: function () {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.loading = true;

                        this.$http.post(this.$store.state.backendURL + '/api/sematext/logsene/' + this.appId + '/plan', {
                            planId: this.planId,
                            limit: parseInt(this.limit)
                        }).then(() => {
                            this.loading = false;
                            this.getUsersApps();
                        }, () => {
                            this.loading = false;
                        });
                    }
                });
            }
        }
    };
</script>