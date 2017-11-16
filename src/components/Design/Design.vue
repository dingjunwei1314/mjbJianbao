<template>
    <div class="design">
        <router-link class="back" to="/designlist">返回列表</router-link>
        <p class="title">规划设计简报</p>
        <el-form ref="form" :model="form" label-width="280px">

            <el-form-item label="简报提交人" required>
                <el-input v-model="form.submitMan" style="width:220px"></el-input>
                <span class="warn-msg">请填写您的真实姓名</span>
            </el-form-item>

            <el-form-item label="楼盘名称" required>
                <el-select
                v-model="form.buidingId"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="searchLoading">
                    <el-option
                    v-for="(item,index) in buidingList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                    </el-option>
                </el-select>
                <span class="warn-msg">请填写楼盘名称</span>
            </el-form-item>

            <hr/>

            <el-form-item label="规划设计评分" required>
                <el-input v-model="form.planningDesign" max='161' min='0' type="number" style="width:220px"></el-input>
                <span class="warn-msg">( 请输入0-161之间的数字 )</span>
            </el-form-item>

            <el-form-item label="推荐点" required>
                <el-input v-model="form.recommend" :maxlength='maxlength2' :minlength='minlength2' style="width:220px" placeholder="例：得房率高"></el-input>
                <span class="warn-msg">请填写楼盘评分项内突出部分（2-8个文字）</span>
            </el-form-item>

            <el-form-item label="户型规划设计" required>
                <el-input v-model="form.houseTypeDesignGrade" max='55' min='0' type="number" style="width:220px"></el-input>
                <span class="warn-msg">( 请输入0-55之间的数字 )</span>
            </el-form-item>

            <el-form-item label="楼栋规划设计" required>
                <el-input v-model="form.buidingDesignGrade" max='34' min='0' type="number" style="width:220px"></el-input>
                <span class="warn-msg">( 请输入0-34之间的数字 )</span>
            </el-form-item>

            <el-form-item label="园区规划设计" required>
                <el-input v-model="form.parkDesignGrade" max='72' min='0'  type="number" style="width:220px"></el-input>
                <span class="warn-msg">( 请输入0-72之间的数字 )</span>
            </el-form-item>

            <el-form-item label="规划设计总体评价" required>
                <quill-editor ref="myTextEditor"
                v-model="form.designText"
                :options="editorOption"
                style="width:100%;">
                </quill-editor>
            </el-form-item>

            <!-- wwww -->
            <hr/>

            <el-form-item label="楼栋规划简评" required>
                <el-input v-model="form.buidingDescribe" :maxlength='maxlength1' :minlength='minlength1' type="textarea" :autosize="autosize" placeholder="请输入针对本楼盘楼栋规划的简评（10-300字）"></el-input>
            </el-form-item>

            <el-form-item label="梯户比评级选择" required>
                <el-radio-group v-model="form.stairToDoorRatio">
                    <el-radio :label="give_two">优</el-radio>
                    <el-radio :label="give_three">良</el-radio>
                    <el-radio :label="give_fore">普</el-radio>
                </el-radio-group>
            </el-form-item>


            <el-form-item label="得房率均值区间" required>
                <el-select v-model="form.constructionRatio" clearable>
                    <el-option :label="item.value" v-for="(item,index) in constructionList" :value="item.key"
                               :key="index"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="【外立面】材质" required>
                <el-select v-model="form.facade" clearable>
                    <el-option :label="item.value" v-for="(item,index) in facadeMaterialList" :value="item.key"
                               :key="index"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="【外立面】简要描述" required>
                <quill-editor
                        v-model="form.facadeDescribe"
                        :options="editorOption2"
                        style="width:100%;">
                </quill-editor>
            </el-form-item>

            <el-form-item label="大堂评级选择" required>
                <el-radio-group v-model="form.lobby">
                    <el-radio :label="give_two">优</el-radio>
                    <el-radio :label="give_three">良</el-radio>
                    <el-radio :label="give_fore">普</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="【大堂】简要描述" required>
                <quill-editor
                        v-model="form.lobbyDescribe"
                        :options="editorOption3"
                        style="width:100%;">
                </quill-editor>
            </el-form-item>

            <hr/>

            <el-form-item label="园区规划简评" required>
                <el-input v-model="form.parkDesign" :maxlength='maxlength1' :minlength='minlength1' type="textarea" :autosize="autosize" placeholder="请输入针对本楼盘园区规划的简述（10-300字）"></el-input>
            </el-form-item>

            <el-form-item label="商业形式" required>
                <el-radio-group v-model="form.commercialForm">
                    <el-radio :label="give_eleven">社区底商</el-radio>
                    <el-radio :label="give_ten">独立商业</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="是否高低配" required>
                <el-radio-group v-model="form.floorInfo">
                    <el-radio :label="give_twelve">纯高层</el-radio>
                    <el-radio :label="give_thirteen">高低配</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="园区机动车停车形式" required>
                <el-radio-group v-model="form.parkParkingType">
                    <el-radio :label="give_fourteen">全地上</el-radio>
                    <el-radio :label="give_fifteen">机动车底下/非机动车地上</el-radio>
                    <el-radio :label="give_sixteen">全地下</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="地下车库出入口" required>
                <el-input v-model="form.undergroundGaragePassageway" :maxlength='maxlength1' :minlength='minlength1' type="textarea" :autosize="autosize"
                          placeholder="请输入针对本楼盘地下车库出入口的简述（10-300字）"></el-input>
            </el-form-item>

            <el-form-item label="园区室内外高差是否对楼栋及户内有影响" required>
                <el-radio-group v-model="form.buidingInfluence">
                    <el-radio :label="give_eight">有</el-radio>
                    <el-radio :label="give_nine">无</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="容积率" required>
                <el-input v-model="form.plotRatioValue" style="width:220px" type="number"
                          placeholder="请输入0.1-10之间的数字"></el-input>
            </el-form-item>

            <el-form-item label="容积率" required>
                <el-radio-group v-model="form.plotRatio">
                    <el-radio :label="give_two">优</el-radio>
                    <el-radio :label="give_three">良</el-radio>
                    <el-radio :label="give_fore">普</el-radio>
                </el-radio-group>
            </el-form-item>


            <el-form-item label="车位比" required>
                <el-table
                        :data="tableData1"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="data"
                            label=""
                            width="">
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="总户数"
                            width="">
                        <template slot-scope="scope">
                            <el-input v-model="form.houseTotal" type="number"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="车位总数">
                        <template slot-scope="scope">
                            <el-input v-model="form.parkingTotal" type="number"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>

            <el-form-item label="绿地率（%）" required>
                <el-input v-model="form.greenValue" type="number" style="width:220px"
                          placeholder="请输入0-100之间的数字"></el-input>
            </el-form-item>

            <el-form-item label="绿地率" required>
                <el-radio-group v-model="form.greenRatio">
                    <el-radio :label="give_two">优</el-radio>
                    <el-radio :label="give_three">良</el-radio>
                    <el-radio :label="give_fore">普</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="楼间距" required>
                <el-radio-group v-model="form.floorSpacing">
                    <el-radio :label="give_two">优</el-radio>
                    <el-radio :label="give_three">良</el-radio>
                    <el-radio :label="give_fore">普</el-radio>
                </el-radio-group>
            </el-form-item>

            <hr/>

            <div v-for="(item,index) in form.houseTypeList" :key="index">
                <h5 style="width: 260px; text-align: right;" v-if="index==0">【户型一】部分评分项评级 </h5>
                <h5 style="width: 260px; text-align: right;" v-if="index==1">【户型二】部分评分项评级 </h5>
                <h5 style="width: 260px; text-align: right;" v-if="index==2">【户型三】部分评分项评级 </h5>
                <h5 style="width: 260px; text-align: right;" v-if="index==3">【户型四】部分评分项评级 </h5>
                <h5 style="width: 260px; text-align: right;" v-if="index==4">【户型五】部分评分项评级 </h5>
                <h5 style="width: 260px; text-align: right;" v-if="index==5">【户型六】部分评分项评级 </h5>
                <h5 style="width: 260px; text-align: right;" v-if="index==6">【户型七】部分评分项评级 </h5>
                <h5 style="width: 260px; text-align: right;" v-if="index==7">【户型八】部分评分项评级 </h5>
                <h5 style="width: 260px; text-align: right;" v-if="index==8">【户型九】部分评分项评级 </h5>
                <h5 style="width: 260px; text-align: right;" v-if="index==9">【户型十】部分评分项评级 </h5>
                <el-form-item required>
                    <span slot="label" v-if="index==0">【户型一】户型名称</span>
                    <span slot="label" v-if="index==1">【户型二】户型名称</span>
                    <span slot="label" v-if="index==2">【户型三】户型名称</span>
                    <span slot="label" v-if="index==3">【户型四】户型名称</span>
                    <span slot="label" v-if="index==4">【户型五】户型名称</span>
                    <span slot="label" v-if="index==5">【户型六】户型名称</span>
                    <span slot="label" v-if="index==6">【户型七】户型名称</span>
                    <span slot="label" v-if="index==7">【户型八】户型名称</span>
                    <span slot="label" v-if="index==8">【户型九】户型名称</span>
                    <span slot="label" v-if="index==9">【户型十】户型名称</span>
                    <el-input v-model="item.houseTypeName" style="width:220px" placeholder="例：A户型"></el-input>
                </el-form-item>

                <el-form-item label="户型图片">
                    <ImgUploader
                            :btnId="btnList[index]"
                            :backgroundPicUrl="preImgSrcList[index].preImgSrc"
                            @previewImg="previewImg(index)"
                            @deleteImg="deleteImg(index)"
                            @imgUploader="imgUploader(index)"
                    />
                </el-form-item>

                <el-form-item label="户型通透" required>
                    <el-radio-group v-model="item.houseTypePermeability">
                        <el-radio :label="give_two">优</el-radio>
                        <el-radio :label="give_three">良</el-radio>
                        <el-radio :label="give_fore">普</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="全明户型" required>
                    <el-radio-group v-model="item.houseTypeSunny">
                        <el-radio :label="give_two">优</el-radio>
                        <el-radio :label="give_three">良</el-radio>
                        <el-radio :label="give_fore">普</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="采光面宽度" required>
                    <el-radio-group v-model="item.sunnyWidth">
                        <el-radio :label="give_two">优</el-radio>
                        <el-radio :label="give_three">良</el-radio>
                        <el-radio :label="give_fore">普</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="套内面积利用率" required>
                    <el-radio-group v-model="item.indoorRatio">
                        <el-radio :label="give_two">优</el-radio>
                        <el-radio :label="give_three">良</el-radio>
                        <el-radio :label="give_fore">普</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="户型方正" required>
                    <el-radio-group v-model="item.houseTypeFounder">
                        <el-radio :label="give_two">优</el-radio>
                        <el-radio :label="give_three">良</el-radio>
                        <el-radio :label="give_fore">普</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item required>
                    <span slot="label" v-if="index==0">【户型一】户型简评</span>
                    <span slot="label" v-if="index==1">【户型二】户型简评</span>
                    <span slot="label" v-if="index==2">【户型三】户型简评</span>
                    <span slot="label" v-if="index==3">【户型四】户型简评</span>
                    <span slot="label" v-if="index==4">【户型五】户型简评</span>
                    <span slot="label" v-if="index==5">【户型六】户型简评</span>
                    <span slot="label" v-if="index==6">【户型七】户型简评</span>
                    <span slot="label" v-if="index==7">【户型八】户型简评</span>
                    <span slot="label" v-if="index==8">【户型九】户型简评</span>
                    <span slot="label" v-if="index==9">【户型十】户型简评</span>
                    <quill-editor
                            v-model="item.houseTypeDesign"
                            :options="editorOption4"
                            style="width:100%;">
                    </quill-editor>
                </el-form-item>

                <el-form-item required>
                    <span slot="label" v-if="index==0">【户型一】赠送面积</span>
                    <span slot="label" v-if="index==1">【户型二】赠送面积</span>
                    <span slot="label" v-if="index==2">【户型三】赠送面积</span>
                    <span slot="label" v-if="index==3">【户型四】赠送面积</span>
                    <span slot="label" v-if="index==4">【户型五】赠送面积</span>
                    <span slot="label" v-if="index==5">【户型六】赠送面积</span>
                    <span slot="label" v-if="index==6">【户型七】赠送面积</span>
                    <span slot="label" v-if="index==7">【户型八】赠送面积</span>
                    <span slot="label" v-if="index==8">【户型九】赠送面积</span>
                    <span slot="label" v-if="index==9">【户型十】赠送面积</span>
                    <el-radio-group 
                        v-model="item.giveType" 
                        @change="radioChange(index)">
                        <el-radio :label="label0" >无赠送面积</el-radio>
                        <el-radio :label="label1" >户内赠送</el-radio>
                        <el-radio :label="label2" >户外赠送</el-radio>
                        <el-radio :label="label3" >包含户内、户外赠送</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item required v-show="item.giveType != 0 && item.giveType != null">
                    <span slot="label" v-if="index==0">【户型一】户内、外赠送面积</span>
                    <span slot="label" v-if="index==1">【户型二】户内、外赠送面积</span>
                    <span slot="label" v-if="index==2">【户型三】户内、外赠送面积</span>
                    <span slot="label" v-if="index==3">【户型四】户内、外赠送面积</span>
                    <span slot="label" v-if="index==4">【户型五】户内、外赠送面积</span>
                    <span slot="label" v-if="index==5">【户型六】户内、外赠送面积</span>
                    <span slot="label" v-if="index==6">【户型七】户内、外赠送面积</span>
                    <span slot="label" v-if="index==7">【户型八】户内、外赠送面积</span>
                    <span slot="label" v-if="index==8">【户型九】户内、外赠送面积</span>
                    <span slot="label" v-if="index==9">【户型十】户内、外赠送面积</span>
                    <el-checkbox-group v-model="item.giveArea">
                        <el-checkbox class="checkItem" label="20" v-show="item.giveType==1 || item.giveType==3">赠送复式面积
                        </el-checkbox>
                        <el-checkbox class="checkItem" label="21" v-show="item.giveType==1 || item.giveType==3">赠送房间
                        </el-checkbox>
                        <el-checkbox class="checkItem" label="22" v-show="item.giveType==1 || item.giveType==3">赠送入户花园
                        </el-checkbox>
                        <el-checkbox class="checkItem" label="23" v-show="item.giveType==1 || item.giveType==3">赠送阳台
                        </el-checkbox>
                        <el-checkbox class="checkItem" label="24" v-show="item.giveType==1 || item.giveType==3">赠送飘窗
                        </el-checkbox>
                        <el-checkbox class="checkItem" label="25" v-show="item.giveType==1 || item.giveType==3">赠送花池
                        </el-checkbox>
                        <el-checkbox class="checkItem" label="26" v-show="item.giveType==2 || item.giveType==3">赠送地下室
                        </el-checkbox>
                        <el-checkbox class="checkItem" label="27" v-show="item.giveType==2 || item.giveType==3">赠送屋顶
                        </el-checkbox>
                        <el-checkbox class="checkItem" label="28" v-show="item.giveType==2 || item.giveType==3">赠送走廊
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

            </div>

            <el-button type="text" @click="AddNewImg" v-if="form.houseTypeList.length < 10 " style="margin-left:240px">
                继续添加一组户型最多十组
            </el-button>

            <el-form-item style="margin-top:20px" v-if = "$route.query.isOnline != 2">
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="back">取消</el-button>
            </el-form-item>

            <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImgSrc" alt="">
            </el-dialog>
        </el-form>
    </div>
</template>

<script>
    import uploader from '../../common/uploader.js'
    import ImgUploader from '../Common/ImgUploader/ImgUploader'
    import Vue from 'vue'
    import VueQuillEditor from 'vue-quill-editor'
    Vue.use(VueQuillEditor);
    export default {
        name: 'design',
        components: {
            ImgUploader
        },
        data() {
            return {
                label0:0,
                label1:1,
                label2:2,
                label3:3,
                maxlength1:300,
                maxlength2:8,
                minlength1:10,
                minlength2:2,
                autosize:true,
                give_two: 2,
                give_three: 3,
                give_fore: 4,
                give_eight:8,
                give_nine:9,
                give_ten: 10,
                give_eleven: 11,
                give_twelve: 12,
                give_thirteen: 13,
                give_fourteen: 14,
                give_fifteen: 15,
                give_sixteen: 16,
                btnList: ['upbtn0', 'upbtn1', 'upbtn2', 'upbtn3', 'upbtn4', 'upbtn5', 'upbtn6', 'upbtn7', 'upbtn8', 'upbtn9'],
                preImgSrcList: [],
                uploaderList: [],
                dialogImgSrc: '',
                dialogVisible: false,
                editorOption: {
                    toolbar: '#toolbar',
                    placeholder: '请输入针对本楼盘规划设计的总体评价3-300字',
                    readOnly: false,
                    theme: 'snow'
                },
                editorOption2: {
                    toolbar: '#toolbar',
                    placeholder: '请输入针对本楼盘【外立面】简要描述3-300字',
                    readOnly: false,
                    theme: 'snow'
                },
                editorOption3: {
                    toolbar: '#toolbar',
                    placeholder: '请输入针对本楼盘【大堂】简要描述3-300字',
                    readOnly: false,
                    theme: 'snow'
                },

                editorOption4: {
                    toolbar: '#toolbar',
                    placeholder: '请输入针对本楼盘户型一简要描述3-300字',
                    readOnly: false,
                    theme: 'snow'
                },
                tableData1: [
                    {data: '数值'}
                ],
                constructionList: [
                    {key: 1, value: '95%-100%'},
                    {key: 2, value: '90%-95%'},
                    {key: 3, value: '85%-90%'},
                    {key: 4, value: '80%-85%'},
                    {key: 5, value: '75%-80%'},
                    {key: 6, value: '70%-75%'},
                    {key: 7, value: '65%-70%'},
                    {key: 8, value: '60%-65%'},
                    {key: 9, value: '55%-60%'},
                    {key: 10, value: '50%-55%'},
                ],
                facadeMaterialList: [
                    {key: '1', value: '石材为主涂料为辅'},
                    {key: '2', value: '纯石料'},
                    {key: '3', value: '涂料为主石料为辅'},
                    {key: '4', value: '纯涂料'},
                ],
                buidingList: [],
                num_buidingId: 0,
                searchLoading: false,
                form: {
                    submitMan: '',
                    buidingId: '',
                    planningDesign: '',
                    recommend: '',
                    houseTypeDesignGrade: '',
                    buidingDesignGrade: '',
                    parkDesignGrade: '',
                    designText: '',
                    buidingDescribe: '',
                    stairToDoorRatio: '',
                    constructionRatio: '',
                    facade: '',
                    facadeDescribe: '',
                    lobby: '',
                    lobbyDescribe: '',
                    parkDesign: '',
                    commercialForm: '',
                    floorInfo: '',
                    parkParkingType: '',
                    buidingInfluence:'',
                    plotRatio: '',
                    plotRatioValue: '',
                    houseTotal: '',
                    parkingTotal: '',
                    greenRatio: '',
                    greenValue:'',
                    floorSpacing: '',
                    undergroundGaragePassageway:'',
                    houseTypeList: []
                }
            };
        },
        created(){
            this.remoteMethod('')
        },
        mounted(){
            if(this.$route.query.type && this.$route.query.type=='edit'){
                this.getdata();
            }
            if(this.$route.query.type && this.$route.query.type=='add'){
                this.preImgSrcList.push({
                    preImgSrc: ''
                })
                this.uploaderList.push({
                    uploader: null
                })
                this.form.houseTypeList.push({
                    houseTypeName: '',
                    houseTypePicUrl: '',
                    houseTypePermeability: '',
                    houseTypeSunny: '',
                    sunnyWidth: '',
                    indoorRatio: '',
                    houseTypeFounder: '',
                    houseTypeDesign: '',
                    giveArea: [],
                    giveType: ''
                })
                this.initUploader(0)
            }
            
        },
        methods: {
            //获取数据
            getdata(){
                let _this = this,
                body = {id: this.$route.query.id};

                this.$http('/buidingPlanDesign/queryById', {body}, {}, {}, 'post').then(function (res) {

                    if (res.data.code == 0) {

                        _this.form = res.data.response;
                        
                        if(_this.form.houseTypeList.length <= 0){
                            _this.form.houseTypeList.push({
                                houseTypeName: '',
                                houseTypePicUrl: '',
                                houseTypePermeability: '',
                                houseTypeSunny: '',
                                sunnyWidth: '',
                                indoorRatio: '',
                                houseTypeFounder: '',
                                houseTypeDesign: '',
                                giveArea: '',
                                giveType: ''  
                            })
                        }
                        
                        _this.form.houseTypeList.forEach((item,index) => {
                            item.giveArea = item.giveArea.split(',')
                            _this.preImgSrcList.push({
                                preImgSrc:item.houseTypePicUrl
                            })
                            _this.uploaderList.push({
                                uploader: null
                            })
                            _this.initUploader(index)
                        })

                    } else if (res.data.code == 300) {
                        _this.$router.push('/login')
                    } else {
                        _this.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
                }).catch(function (err) {
                    console.log(err)
                })
            },
            //单选框改变
            radioChange(index){
                this.form.houseTypeList[index].giveArea = []
            },
            //初始化上传插件对象
            initUploader(index){
                let _this = this,
                btnName = 'upbtn' + index;
                uploader(function (src) {
                    _this.preImgSrcList[index].preImgSrc = src;
                }, function (key) {
                    _this.form.houseTypeList[index].houseTypePicUrl = key;
                }, function () {
                    _this.preImgSrcList[index].preImgSrc = '';
                }, function (uploader) {
                    _this.uploaderList[index].uploader = uploader
                }, btnName)
            },
            //预览上传图
            previewImg(index){
                this.dialogImgSrc = this.preImgSrcList[index].preImgSrc;
                this.dialogVisible = true;
            },
            //删除图片
            deleteImg(index){
                this.preImgSrcList[index].preImgSrc = '';
                this.form.houseTypeList[index].houseTypePicUrl = ''
            },
            //开始上传
            imgUploader(index){
                if (this.uploaderList[index].uploader == null) {
                    return;
                }
                this.uploaderList[index].uploader.start()
            },
            //继续添加一组照片
            AddNewImg(){
                let _index = this.form.houseTypeList.length
                this.form.houseTypeList.push({
                    houseTypeName: '',
                    houseTypePicUrl: '',
                    houseTypePermeability: '',
                    houseTypeSunny: '',
                    sunnyWidth: '',
                    indoorRatio: '',
                    houseTypeFounder: '',
                    houseTypeDesign: '',
                    giveArea: [],
                    giveType: ''
                });
                this.preImgSrcList.push({preImgSrc: ''})
                this.uploaderList.push({uploader: null})
                this.initUploader(_index)
            },
            //模糊搜索
            remoteMethod(val){
                let _this = this,
                    body = {buildingName: val};
                this.searchLoading = true;
                this.$http('/backstageBuilding/getBuildingNameList', {body}, {}, {}, 'post').then(function (res) {
                    _this.searchLoading = false;
                    if (res.data.code == 0) {

                        _this.buidingList = res.data.response;

                    } else if (res.data.code == 300) {
                        _this.$router.push('/login')
                    } else {
                        _this.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
                }).catch(function (err) {
                    _this.searchLoading = false;
                    console.log(err)
                })
            },
            //提交方法
            onSubmit(){
                if(this.form.houseTotal == '' || this.form.parkingTotal == ''){
                    this.$message({
                        message: '车位比未填写',
                        type: 'warning'
                    });
                    return;
                }
                if (this.$route.query.id) {
                    this.submit_url = '/buidingPlanDesign/updateInfo';
                } else {
                    this.submit_url = '/buidingPlanDesign/insertInfo';
                }

                let _this = this;
                this.$confirm('确认提交吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    let _form = _.cloneDeep(_this.form);
                    
                    _form.houseTypeList.forEach((item,index)=>{
                        item.giveArea = item.giveArea.join(',')
                    })

                    let body = {} = _form;
                    let arr = body.houseTypeList;

                    if (typeof body.buidingId === 'string') {
                        body.buidingId = _this.num_buidingId;

                    } else {
                        body.buidingId = _this.form.buidingId;

                    }

                    this.$http(this.submit_url, {body}, {}, {}, 'post').then(function (res) {
                        if (res.data.code == 0) {
                            _this.$router.push('/designlist')
                            _this.$message({
                                message: res.data.message,
                                type: 'success'
                            });
                        } else if (res.data.code == 300) {
                            _this.$router.push('/login')

                        } else {
                            _this.$message({
                                message: res.data.message,
                                type: 'warning'
                            });
                        }
                    }).catch(function (err) {
                        console.log(err)
                    })

                }).catch(() => {
                    _this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            //返回列表
            back(){
                this.$router.push('/briefinglist')
            }
        }
    }
</script>

<style scoped>
    .design .title {
        font-size: 24px;
        font-weight: bold;
        color: #0D263F;
        text-align: center;
    }

    .design {
        width: 800px;
        margin: 0 auto;
    }

    .warn-msg {
        font-size: 12px;
        color: #777;
        padding-left: 10px
    }
    .back{position: fixed;top: 40px;left: 40px}
</style>
<style>
    .el-table td, .el-table th.is-leaf {
        text-align: center;
        font-size: 12px;
    }

    .el-table .el-input__inner {
        border: none
    }

    .design .checkItem {
        display: block;
        margin-left: 0px
    }
</style>