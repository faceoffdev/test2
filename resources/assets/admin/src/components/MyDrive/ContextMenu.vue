<template>
    <VMenu
        v-if="items.length"
        v-model="showMenu"
        :position-x="x"
        :position-y="y"
        absolute
        offset-y
    >
        <VList id="contextmenu">
            <VListTile
                v-for="(item, index) in items"
                :key="index"
                ripple
                @click="item.action"
            >
                <VListTileAction v-if="item.icon">
                    <VIcon>{{ item.icon }}</VIcon>
                </VListTileAction>
                <VListTileTitle>{{ item.title }}</VListTileTitle>
            </VListTile>
        </VList>
    </VMenu>
</template>

<script>
import { mapState } from 'vuex'
import Mixins from './mixin'

export default {
    mixins: [Mixins],
    props: {
        value: {
            type: Boolean
        },
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        },
        file: {
            type: Object,
            default () {
                return {

                }
            }
        }
    },
    data () {
        return {
            showMenu: this.value
        }
    },
    computed: {
        ...mapState('Media', ['selectedFilesId']),
        items () {
            if (this.file.hasOwnProperty('id') && this.file.deleted_at === null) {
                if (this.file.type === 'folder') {
                    return this.menuitems.filter(i => i.show === 'items').filter(i => i.title !== 'Preview')
                }
                return this.menuitems.filter(i => i.show === 'items')
            } else if (this.file.hasOwnProperty('id') && this.file.deleted_at !== null) {
                return this.menuitems.filter(i => i.show === 'trash')
            } else if (this.$route.name === 'media' || this.$route.name === 'singleFolder') {
                return this.menuitems.filter(i => i.show === 'back')
            }

            return []
        },

        menuitems () {
            return [
                {
                    title: 'Переименовать',
                    icon: 'edit',
                    show: 'items',
                    action: this.openRenameModel
                },
                {
                    title: 'Копировать',
                    icon: 'file_copy',
                    show: 'items',
                    action: this.copyFiles
                },
                {
                    title: 'Скачать',
                    icon: 'cloud_download',
                    show: 'items',
                    action: this.downloadFile
                },
                {
                    title: 'Удалить',
                    icon: 'delete',
                    show: 'items',
                    action: this.deleteItems
                },
                {
                    title: 'Новая папка',
                    icon: 'create_new_folder',
                    show: 'back',
                    action: this.openNewFolderModal
                },
                {
                    title: 'Загрузить файлы',
                    icon: 'cloud_upload',
                    show: 'back',
                    action: this.openDropZone
                },
                {
                    title: 'Загрузить папку',
                    icon: 'folder_open',
                    show: 'back',
                    action: this.uploadFolder
                }
            ]
        }
    },
    watch: {

        value (newVal) {
            this.showMenu = false
            this.$nextTick(() => {
                this.showMenu = newVal
            })
        },
        x () {
            this.showMenu = false
            this.$nextTick(() => {
                this.showMenu = true
            })
        },
        y () {
            this.showMenu = false
            this.$nextTick(() => {
                this.showMenu = true
            })
        }
    },
    methods: {
        openDropZone () {
            Bus.$emit('openDropZone')
        },
        uploadFolder () {
            Bus.$emit('uploadFolder')
        },
        openRenameModel () {
            this.$store.commit('Media/renamefilemodal', true)
        },
        deleteItems () {
            this.$store.dispatch('Media/deleteItem', { ids: this.selectedFilesId })
        },
        copyFiles () {
            this.$store.dispatch('Media/copyFile', { ids: this.selectedFilesId })
        },
        downloadFile () {
            this.$store.dispatch('Media/downloadFile', { ids: this.selectedFilesId })
        }
    }
}
</script>

<style>
    #contextmenu {
        width: 300px;
        padding: 10px;
    }
    #contextmenu .v-list__tile.theme--light:hover {
        background: #f3f3f3;
    }
    #contextmenu .v-list__tile__action {
        min-width: 36px;
    }
    #contextmenu .v-list__tile {
        height: 32px;
        cursor: pointer;
    }
</style>
