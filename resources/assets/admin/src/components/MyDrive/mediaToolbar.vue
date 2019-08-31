<template>
    <VToolbar
        id="mediaToolbar"
        flat
        light
        height="40px"
        class="la-pt"
        color="white"
    >
        <VToolbarTitle>
            <VIcon>perm_media</VIcon>
            Мои Файлы
            <VMenu offset-y>
                <VBtn
                    slot="activator"
                    icon
                >
                    <VIcon>arrow_drop_down</VIcon>
                </VBtn>

                <VList>
                    <VListTile @click="openNewFolderModal()">
                        <VListTileTitle>
                            <VIcon>create_new_folder</VIcon>
                            Новая папка
                        </VListTileTitle>
                    </VListTile>
                    <VListTile @click="uploadFolder">
                        <VListTileTitle>
                            <VIcon>create_new_folder</VIcon>
                            Загрузить папку
                        </VListTileTitle>
                    </VListTile>
                    <VListTile @click="openDropZone">
                        <VListTileTitle>
                            <VIcon>add_photo_alternate</VIcon>
                            Загрузить файлы
                        </VListTileTitle>
                    </VListTile>
                </VList>
            </VMenu>
        </VToolbarTitle>

        <VSpacer />

        <VBtn
            icon
            @click="openDropZone()"
        >
            <VIcon>add_photo_alternate</VIcon>
        </VBtn>
        <VBtn
            icon
            @click="openNewFolderModal()"
        >
            <VIcon>create_new_folder</VIcon>
        </VBtn>
    </VToolbar>
</template>

<script>
import Mixins from './mixin'
import { mapState } from 'vuex'
export default {

    mixins: [Mixins],
    data () {
        return {

        }
    },
    computed: {
        ...mapState('Media', ['fileInfoSideBar'])
    },
    methods: {
        openDropZone () {
            Bus.$emit('openDropZone')
        },
        uploadFolder () {
            Bus.$emit('uploadFolder')
        }
    }
}
</script>

<style>
    #mediaToolbar .v-btn.active {
        background: #0e5796;
        color: #fff;
    }
</style>
