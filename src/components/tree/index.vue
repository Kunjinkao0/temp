<template>
    <div>
        <div class="cu-fx cu-marb8">
            <a-input-search style="max-width: 360px;background-color:#FFFFFF;border-color:rgb(235 230 230);"
                v-model="searchKey" :placeholder="$t('search-content')" />
            <!-- <icon-menu-fold class="cu-pointer cu-marl16 cu-font24 cu-color-86909c" @click="collapseTree()" /> -->
        </div>
        <a-tree class="tree-scrollbar" :data="treeData" @select="onSelect" :default-selected-keys="defaultSelectedKeys"
            :default-expanded-keys="defaultExpandedKeys" :virtual-list-props="heightConfig">
            <template #icon="nodeData">
                <a-image :src="tree01Pic" v-if="(nodeData.node.key.toString().indexOf(',') >= 0 && nodeData.node.key.toString().split(',')[1] === '1') || nodeData.node.key === '0'" :preview="false"></a-image>
                <a-image :src="tree02Pic" v-else :preview="false"></a-image>
            </template>
            <template #title="nodeData">
                <template v-if="getMatchIndex(nodeData?.title) && index < 0">{{ nodeData?.title }}</template>
                <span v-else>
                    {{ nodeData?.title?.substr(0, index) }}
                    <span style="color: var(--color-primary-light-4);">
                        {{ nodeData?.title?.substr(index, searchKey.length) }}
                    </span>{{ nodeData?.title?.substr(index + searchKey.length) }}
                </span>
            </template>
        </a-tree>
    </div>
</template>

<script setup lang='ts'>
import tree01Pic from '@/assets/images/tree/icon_tree_01.png';
import tree02Pic from '@/assets/images/tree/icon_tree_02.png';

import { ref, computed,onMounted } from 'vue';

const heightConfig = ref({
    height:'690px',
    threshold:600
})

// 当前分辨率width
const clientWidth = ref(1920)

onMounted(() => {
    clientWidth.value = document.body.clientWidth
    heightConfig.value = {
        height: `${document.body.clientHeight-295}px`,
        threshold: document.body.clientHeight-295
    } 
})

const props = defineProps({
    originTreeData: {
        type: Array,
        default() {
            return [];
        },
    },
    defaultSelectedKeys: {
        type: Array as any,
        default() {
            return [''];
        },
    },
    defaultExpandedKeys: {
        type: Array as any,
        default() {
            return ['0,1'];
        },
    }
});

const searchKey = ref('');
const treeData = computed(() => {
    if (!searchKey.value) return props.originTreeData;
    return searchData(searchKey.value);
})

const searchData = (keyword: any) => {
    const loop = (data: any) => {
        const result: any = [];
        data.forEach((item: { title: string; children: any; }) => {
            if (item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                result.push({ ...item });
            } else if (item.children) {
                const filterData = loop(item.children);
                if (filterData.length) {
                    result.push({
                        ...item,
                        children: filterData
                    })
                }
            }
        })
        return result;
    }
    return loop(props.originTreeData);
}

const index = ref(0);
const getMatchIndex = (title: string) => {
    if (!searchKey.value) {
        return -1
    };
    index.value = title.toLowerCase().indexOf(searchKey.value.toLowerCase());
    return index.value;
}

// 选中树节点的key
const emit = defineEmits(['onSelect', 'onSelectParent', 'onSelectChild', 'collapseTree']);
const onSelect = (newSelectedKeys, event) => {
    const key = newSelectedKeys[0];
    const data: any = props.originTreeData;
    const select = {
        key: newSelectedKeys[0],
        title: event.node.title,
        realKey: event.node.realId
    }
    // 获取当前选中的节点
    emit('onSelect', select);
    // 获取选中的父节点--包含当前节点
    emit('onSelectParent', findParent(key, data, []));
    // 获取选中的子节点
    emit('onSelectChild', findChild(key, data, []));
};

// 查找父节点
function findParent(key, list = [], result = []) {
    for (let item of list) {
        if (item.key === key) {
            result.push({
                key: item.key,
                title: item.title,
                realKey: item.realId
            })
            if (result.length === 1) return result;
            return true;
        }
        if (item.children) {
            result.push({
                key: item.key,
                title: item.title,
                realKey: item.realId
            })
            const find = findParent(key, item.children, result)
            if (find) {
                return result
            }
            result.pop()
        }
    }
    return false
}

// 查找子节点
function findChild(key, list = [], result = []) {
    if (key === "0,1") {
        result.push({
            key: list[0].key,
            title: list[0].title,
            realKey: list[0].realId
        })
    } else {
        for (let item of list) {
            if (item.key === key) {
                if (item.children) {
                    findChildNodesDeep(item.children, result);
                } else {
                    result.push({
                        key: item.key,
                        title: item.title,
                        realKey: item.realId
                    });
                }
            } else if (item.children) {
                findChild(key, item.children, result);
            }
        }
    }
    return result;
}
function findChildNodesDeep(childs, result) {
    if (childs) {
        childs.forEach((item) => {
            if (item.children) {
                findChildNodesDeep(item.children, result);
            } else {
                result.push({
                    key: item.key,
                    title: item.title,
                    realKey: item.realId
                });
            }
        });
    }
}

// 折叠树
const collapseTree = () => {
    emit('collapseTree');
}

</script>

<style scoped lang='less'>
    :deep(.arco-tree-node-title){
        flex: 1;
    }

    :deep(.arco-tree-node-selected .arco-tree-node-title){
        background: #D9E9FF;
    }
</style>
