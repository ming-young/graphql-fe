<template lang='pug'>
div
  div
    el-input(style="display: inline-block;width:20%")(placeholder="参数:国家地址" v-model="position")
    el-select(style="display: inline-block;margin: 0 10px; width:70%")(v-model="customData" multiple placeholder="请选择需要查询的数据" )
      el-option(
        v-for="item in originColumnList"
        :key="item.value"
        :label="item.label"
        :value="item.prop"
      )
        span(style="float: left") {{ item.label }}
        span(style="float: right; color: #8492a6; font-size: 13px") {{ item.prop }}
  el-button(@click="getAllData") 获取全部数据

  el-button(@click="getCustomData") 按需获取数据

  el-button(@click="addNewData") 添加新的数据

  el-button(@click="submitMutation") 修改原有数据

  div.table
    el-table(
      :data="tableData"
      style="width: 100%"
      prop="date"
      label="日期"
      width="180")
      el-table-column(
        v-for="(item) in columnList"
        :key="item.prop"
        v-bind="item")

</template>

<script>
import gql from 'graphql-tag';
import company from '../graphql/company.graphql';

export default {
  name: 'GraphQL',
  components: {

  },
  data () {
    return {
      position: '',
      tableData: [],
      originColumnList: [
        {
          prop: 'name',
          label: '名称',
          align:'center'
        },
        {
          prop: 'position',
          label: '地址',
          align:'center'
        },
        {
          prop: 'Employees',
          label: '员工数量',
          align:'center'
        },
        {
          prop: 'Project.length',
          label: '项目数量',
          align:'center'
        },
      ],
      columnList: [],
      customData: []
    }
  },
  methods: {

    async getAllData (){

      /** 配置对应的columnlist */
      this.columnList = this.originColumnList
      const reqData = {
        query: `${company}`,
        variables: null
      }
      try {
        const data = await this.$post('/api/graphql',reqData)
        console.log('all data > ',data.data.data.Company);
        this.tableData = data.data.data.Company
      } catch (error) {
        console.log('get all data error > ', error);
      }
    },
    async getCustomData () {
      this.columnList = this.originColumnList.filter(e => {
        return this.customData.findIndex(item => e.prop === item) !== -1
      })
      /** 动态配置需要查询的数据 */
      const params = this.columnList.map(e => e.prop).join(' ')
      const reqData = {
        query: `query {Company(position: "${this.position}") { ${params} }}`,
      }
      try {
        const data = await this.$post('/api/graphql',reqData)
        console.log('all data > ',data.data.data.Company);
        this.tableData = data.data.data.Company
      } catch (error) {
        console.log('get custom data error > ', error);
      }
    },
    async submitMutation (){

      const mutation = "mutation {\n  updateCompany(name: \"google\", position: \"china\", employees: 100){\n    name,\n    position\n  }\n}"
      let reqData = {
        query: mutation
      }
      try {
        await this.$post('/api/graphql',reqData)
        
        reqData = {
          query: `query {Company(position: "") {    name   position    Employees   Project {name} }}`,
          variables: null
        }

      const data = await this.$post('/api/graphql',reqData)
        this.tableData = data.data.data.Company
      } catch (error) {
        console.log('get custom data error > ', error);
      }
    },
    addNewData (){
      const query = gql`query {
        accountList {
          id
          username
          password
        }
      }`
      console.log(query);
    }
  },
}
</script>

<style scoped lang="stylus">
.table
  width 90%
</style>
