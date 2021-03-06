import React, { Component } from 'react';
import { Text,Item, Input } from 'native-base';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import {  Row, Grid } from 'react-native-easy-grid';
import {appReduxChange, appReduxTest} from "../actions/app";
import {width, height} from "../constants/Layout";
import {connect} from "react-redux";
import {AsyncStorage, Platform, StyleSheet} from "react-native";
import {urlDev} from "../constants/Url";
import axios from "axios/index";
import {Toast} from "antd-mobile-rn/lib/index.native";

class FindBackPassword extends Component {
    state={
        gettingCode:false,
    gettingCodeTime:0,
    mobile:'',
    inputCode:'',
        code:'',
    };
    static navigationOptions = {
        header: null,
    };
    async componentDidMount(){
        // console.log(width)
    }
    _handleIsOpenClick = () => {
        const params = {
            mobile:this.state.mobile
        }
        const thisTemp =this;
        if(this.state.mobile !== ''){
            axios.post(urlDev+'/api/getMsg',{
                mobile: this.state.mobile,
            })
                .then(function (response) {
                    thisTemp.setState({
                        code:response.data.data.code
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.setState({ gettingCode: true, gettingCodeTime:60});
            let stateTemp = this;
            let timer = null;
            timer = setInterval(function () {
                if (stateTemp.state.gettingCodeTime > 0) {
                    stateTemp.setState({ gettingCodeTime: stateTemp.state.gettingCodeTime-1 });
                }else if(stateTemp.state.gettingCodeTime === 0){
                    stateTemp.setState({ gettingCode: false });
                }
                else {
                    clearInterval(timer);
                }
            }, 1000);
        }else {
            Toast.info('先输个手机号 !');
        }


    };
    _handleIsOpenClick1 = () => {
        // this.props.navigation.navigate( 'Reset');
        if(this.state.inputCode===''||this.state.code===''){
            Toast.fail('请先验证手机号 !',1);
        }else
        if(this.state.inputCode === this.state.code){
            Toast.success('验证成功 !',1);
            this.props.navigation.navigate( 'Reset');
        }else {
            Toast.fail('验证码错误 !',1);
        }
        AsyncStorage.setItem('mobile', (this.state.mobile), (error, result) => {
            if (!error) {
                // console.log("设置成功")
                // this.setState({ firstOpen: false });
            }
        });
    };
    _handleIsOpenClick3 = () => {
        AsyncStorage.setItem('firstOpen','false', (error, result) => {
            if (!error) {
                console.log("设置成功")
                this.setState({ firstOpen: false });
            }
        });
    };
    render() {
        // const
        return (
            <Container>
              
                <Row style={{  height: height*12 }}></Row>
                <Header transparent>
                    <Left>
                        <Button onPress={() => this.props.navigation.goBack()} transparent>
                            <Icon style={{marginLeft:width*15,color:Platform.OS === 'ios' ?'#1C86EE' : 'black' }} name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title style={{fontSize: 18}}>找回密码</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        </Button>
                    </Right>
                </Header>
                <Grid>
                  
                    <Row style={{  height: height*41 }}></Row>
                    <Row style={{  height: height*67,
                        justifyContent: 'center' }}>
                            <Item style={{  width: width*315,marginBottom:30 }} >
                                <Input onChangeText={(text) => this.setState({mobile:text})} style={{fontSize: 15,marginLeft: width*30}} placeholderTextColor="#888888"  placeholder='手机号'/>
                            </Item>
                    </Row>
                    <Row style={{  height: height*55,
                        justifyContent: 'center' }}>
                            <Item style={{  width: width*315,marginBottom:15 }} >
                                <Input onChangeText={(text) => this.setState({inputCode:text})} style={{fontSize: 15,marginLeft: width*30}} placeholderTextColor="#888888" placeholder='验证码'/>
                                {this.state.gettingCode?
                                <Button onPress={() => {
                                this._handleIsOpenClick()
                                }} style={styles.gettingCode} disabled bordered rounded>
                                <Text style={{fontSize: 10,color:'#868686',
                                justifyContent: 'center',}}>{this.state.gettingCodeTime}{Platform.OS === 'ios' ?'秒后重新获取' : '秒'}</Text>
                                </Button>:
                                <Button onPress={() => {
                                this._handleIsOpenClick()
                                }} style={styles.getCode} bordered rounded>
                                <Text style={{fontSize: 10,color:'#EB632E',
                                justifyContent: 'center',}}>{Platform.OS === 'ios' ?'获取验证码' : '验证码'}</Text>
                                </Button>}
                            </Item>
                    </Row>
                    <Row style={{  height: height*40 }}></Row>
                    <Row style={{  height: height*75,
                        justifyContent: 'center' }}>
                        <Button onPress={() => {
                            this._handleIsOpenClick1()
                        }} style={styles.registButton} rounded>
                            <Text style={{ fontSize:22 }} >下一步</Text>
                        </Button>
                    </Row>
                    {/*<Row style={{  height: height*77.5,*/}
                    {/*justifyContent: 'center' }}>*/}
                    {/*<Text style={{fontSize: 13,color:'#444444'}} onPress={() => {*/}
                    {/*this._handleIsOpenClick3()*/}
                    {/*}}>已有账号？登录</Text>*/}
                    {/*</Row>*/}
                    {/*<Row style={{  height: height*35,*/}
                    {/*justifyContent: 'center' }}>*/}
                    {/*<Text style={{fontSize: 15,color:'#999999'}} onPress={() => {*/}
                    {/*this._handleIsOpenClick3()*/}
                    {/*}}>其他方式登录</Text>*/}
                    {/*</Row>*/}
                    {/*<Row style={{  height: height*120,*/}
                    {/*justifyContent: 'center' }}>*/}
                    {/*<Col style={{  height: height*89 }}></Col>*/}
                    {/*<Col style={{  height: height*95,alignItems: 'center', }}>*/}
                    {/*<TouchableHighlight underlayColor="rgba(52, 52, 52, 0)" onPress={() => {*/}
                    {/*this._handleIsOpenClick()*/}
                    {/*}}>*/}
                    {/*<Image style={{ width: width*46, height:height*46 }} source={require('../assets/icons/facebookIcon.png')}/>*/}
                    {/*</TouchableHighlight></Col>*/}
                    {/*<Col style={{  height: height*95,alignItems: 'center', }}>*/}
                    {/*<TouchableHighlight underlayColor="rgba(52, 52, 52, 0)" onPress={() => {*/}
                    {/*this._handleIsOpenClick()*/}
                    {/*}}>*/}
                    {/*<Image style={{ width: width*46, height:height*46 }} source={require('../assets/icons/wechatIcon.png')}/>*/}
                    {/*</TouchableHighlight>*/}
                    {/*</Col>*/}
                    {/*<Col style={{  height: height*89 }}></Col>*/}
                    {/*</Row>*/}
                </Grid>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    getCode: {
        width: width*85,
        height: height*26,
        // backgroundColor: '#EB632E',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:width*10,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#EB632E',
    },
    gettingCode: {
        width: width*85,
        height: height*26,
        // backgroundColor: '#EB632E',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:width*10,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#868686',
    },
    welcomeWord: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    registButton: {
        width: width*200,
        height:height*49,
        backgroundColor: '#EB632E',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapStateToProps = (state) => {
    return{
        FindBackPassword: state.FindBackPassword
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        appReduxTest: () => {
            dispatch(appReduxTest())
        },
        appReduxChange: () => {
            dispatch(appReduxChange())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FindBackPassword);
