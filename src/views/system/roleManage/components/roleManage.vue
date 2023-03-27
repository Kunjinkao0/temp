<template>
  <div class="container">
    <a-tree
      :checkable="true"
      v-model:selected-keys="selectedKeys"
      v-model:checked-keys="checkedKeys"
      :auto-expand-parent="true"
      :only-check-leaf="true"
      :show-line="true"
      @select="onSelect"
      @check="onCheck"
      :data="treeData"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { getFormMenuTree } from '@/api/menuManage'
  import { getMeunByRoleId,addRoleAndMenu } from '@/api/roleManage';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  
  const { loading, setLoading } = useLoading(true);
  const roleId = ref();
  const allCheckedKeys = ref([]);

  const selectedKeys = ref([]);
  const halfCheckedKeys = ref([])
  const checkedKeys = ref([]);


  const treeData = ref([]);
  const init = (id) => {
    roleId.value = id
    allCheckedKeys.value = []
    initTree()
  }

  const initTree = async () => {
    setLoading(true);
    const menuTree: any = await getFormMenuTree();
    if (menuTree.code === 200) {
      treeData.value = menuTree.data
      initRole()
    }
    setLoading(false);
  }

  const initRole = async () => {
    setLoading(true);
    let menuIdsData = [];
    const result: any = await getMeunByRoleId(roleId.value);
    if (result.code === 200) {
      menuIdsData = result.data;
      menuIdsData.forEach((val,index,array)=>{
        allCheckedKeys.value.push(array[index].resourceId);
      })
    }
    toggleChecked();
    setLoading(false);
  }


  const toggleChecked = () => {
    checkedKeys.value = allCheckedKeys.value;
  }

  const onSelect = (newSelectedKeys, event) => {
    console.log('select: ', newSelectedKeys, event);
  }

  const onCheck = (newCheckedKeys, event) => {
    halfCheckedKeys.value = event.halfCheckedKeys
    checkedKeys.value = newCheckedKeys
  }

  const onSubmitClick = async () => {
    setLoading(true);
    const result: any = await addRoleAndMenu(checkedKeys.value.concat(halfCheckedKeys.value),roleId.value);
    if (result.code === 200) {
      Message.success(result.message)
    } else {
      Message.error(result.message)
    }
    setLoading(false);
  };

  defineExpose({ init,onSubmitClick })

</script>