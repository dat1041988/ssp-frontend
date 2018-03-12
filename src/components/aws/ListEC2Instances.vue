<template>
    <div>
        <div class="hero is-light">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title"><i class="material-icons">list</i> AWS EC2 Instanzen anzeigen</h1>
                </div>
                <h2 class="subtitle">
                    Hier werden alle deine AWS EC2 Instanzen angezeigt.</h2>
            </div>
        </div>
        <br>
        <b-table :data="data"
                 v-bind:class="{'is-loading': loading}"
                 :narrowed="true">

            <template slot-scope="props">
                <b-table-column field="name" label="Instance-Name">
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column field="account" label="SBB AWS Account">
                    {{ props.row.account }}
                </b-table-column>
                <b-table-column field="account" label="State">
                    <b-tooltip :label="getStateLabel(props.row)">
                        <a v-on:click="toggleState(props.row)">
                            <b-icon :icon="getStateIcon(props.row)"
                                    :type="getStateType(props.row)">
                            </b-icon>
                        {{ props.row.state }}
                        </a>
                    </b-tooltip>
                </b-table-column>
            </template>

            <div slot="empty" class="has-text-centered">
                Hier werden deine Instanzen angezeigt, wenn du welche hast.
            </div>

        </b-table>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [],
        loading: false
      };
    },
    mounted: function() {
        this.listEC2Instances();
    },
    methods: {
      listEC2Instances: function() {
        this.loading = true;
        this.$http.get(this.$store.state.backendURL + '/api/aws/ec2').then((res) => {
          this.data = res.body.instances;
          this.loading = false;
        }, () => {
          this.loading = false;
        });
      },
      toggleState: function(row) {
        var nextState;

        // check if instance is already changing state
        if (row.state == 'pending' || row.state == 'stopping' || row.state == 'terminated') {
          return
        }

        // use running as conditional! the 'else' case should not be stop
        nextState = (row.state == 'running') ? 'stop' : 'start';

        if (nextState == 'start' || confirm("Are you sure you want to stop " + row.name + "?")) {
          // change state so that user interface is responsive
          row.state = (row.state == 'running') ? 'stopping' : 'pending';
          this.$http.post(this.$store.state.backendURL + '/api/aws/ec2/' + row.id + '/' + nextState).then((res) => {
            row.state = res.body.state;
          }, () => {
            row.state = 'unknown';
          });
        }
      },
      getStateIcon: function(row) {
        switch (row.state) {
          case 'stopped':
            return 'circle-outline'
          case 'running':
            return 'circle';
          case 'stopping':
            return 'arrow-down-drop-circle-outline';
          case 'pending':
            return 'arrow-up-drop-circle';
          default:
            return 'alert-circle-outline';
        }
      },
      getStateType: function(row) {
        switch (row.state) {
          case 'stopped':
          case 'stopping':
            return 'is-danger';
          case 'running':
          case 'pending':
            return 'is-success';
          default:
            return 'is-danger';
        }
      },
      getStateLabel: function(row) {
        if (row.state == 'running') {
          return 'stop';
        } else if (row.state == 'stopped') {
          return 'start';
        } else {
          // disable tooltip if state is changing
          return '';
        }
      }
    }
  }
</script>
