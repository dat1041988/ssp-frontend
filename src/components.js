import Vue from 'vue';
// Global Components
import App from './components/App.vue';
import Home from './components/shared/Home.vue';
import Nav from './components/shared/Nav.vue';
import Login from './components/shared/Login.vue';
import Notification from './components/shared/Notification.vue';
// OSE-Components
import EditQuota from './components/ose/EditQuota.vue';
import NewProject from './components/ose/NewProject.vue';
import NewTestProject from './components/ose/NewTestProject.vue';
import AdminList from './components/ose/AdminList.vue';
import UpdateBilling from './components/ose/UpdateBilling.vue';
import NewServiceAccount from './components/ose/NewServiceAccount.vue';
// Gluster-Components
import FixVolume from './components/gluster/FixVolume.vue';
import NewVolume from './components/gluster/NewVolume.vue';
import GrowVolume from './components/gluster/GrowVolume.vue';
// DDC-Components
import DDCBilling from './components/ddc/Billing.vue';
// AWS Components
import ListS3Buckets from './components/aws/ListS3Buckets.vue';
import NewS3Bucket from './components/aws/NewS3Bucket.vue';
import NewS3User from './components/aws/NewS3User.vue';
import ListEC2Instances from './components/aws/ListEC2Instances.vue';
// Sematext Components
import SematextAppList from './components/sematext/AppList.vue';
import SematextNewApp from './components/sematext/NewApp.vue';
import SematextChangeBilling from './components/sematext/ChangeBilling.vue';
import SematextChangePlan from './components/sematext/ChangePlan.vue';

Vue.component('login', Login);
Vue.component('navbar', Nav);
Vue.component('notification', Notification);

export const GlobalComponents = {
    App,
    Login
};

export const LocalComponents = {
    Home,
    EditQuota,
    NewProject,
    AdminList,
    NewTestProject,
    UpdateBilling,
    NewServiceAccount,
    FixVolume,
    NewVolume,
    GrowVolume,
    DDCBilling,
    ListS3Buckets,
    ListEC2Instances,
    NewS3Bucket,
    NewS3User,
    SematextAppList,
    SematextNewApp,
    SematextChangeBilling,
    SematextChangePlan
};



