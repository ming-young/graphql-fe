 const code = `<template>
  <DragTable
    :data="tableData"
    :header="tableHeader"
    @change="dragChange"
    @edit="handleEdit"
    @view="handleView"
    border
    max-height="500">
    <el-table-column slot="fixed" type="expand" width="50" fixed="left"></el-table-column>
    <el-table-column slot="fixed" type="selection" width="50" fixed="left"></el-table-column>
    <el-table-column slot="fixed" type="index" label="序号" width="50" fixed="left"></el-table-column>
  </DragTable>
</template>`

export default code