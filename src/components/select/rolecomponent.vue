<template>
  <Multiselect
    :value="modelrole"
    :options="roles"
    :custom-label="({ id_role, nom_role }) => `${id_role} - [${nom_role}]`"
    valueProp="id_role"
    :placeholder="placeholder"
    label="nom_role"
    track-by="nom_role"
    :searchable="true"
  >
  </Multiselect>
</template>
<script>
import Multiselect from "@vueform/multiselect";
import onlineService from '../../services/onlineService';

export default {
  name: "rolecomponent",
  props: ["modelrole", "placeholder"],
  data() {
    return {
      roles: [],
    };
  },
  created() {
    this.getRole();
  },

  methods: {
    async getRole() {
      this.roles = await onlineService.getRole()
    },
  },
  components: { Multiselect },
};
</script>