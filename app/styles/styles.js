import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({

//++++++++++++++++++++++++++++++
//+++++ COMPONENT SPECIFIC +++++
//++++++++++++++++++++++++++++++

////+++++ Camera Roll +++++
  CRcontainer: {
    flex: 1,
    backgroundColor: '#F6AE2D'
  },
  CRcontent: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  CRtext: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  CRbold: {
    fontWeight: 'bold',
  },
  CRinfo: {
    fontSize: 12,
  },
////+++++ Camera +++++

  camContainer: {
    flex: 1,
    marginBottom: 50
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    //backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },


////+++++ Favorites +++++

  foodFavCardOuter: {
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fafafa',
    marginBottom: 4
  },
  foodFavCardInner: {
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#000000',
    marginBottom: 10
  },
  foodFavCardComment: {
    padding: 5,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fafafa'
  },

////+++++ Recs +++++

  recContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4d4d4',
  },
  foodRecCardOuter: {
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fafafa',
    marginBottom: 4,
  },
  foodRecCardInner: {
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#000000',
  },
  foodRecCardComment: {
    flex: 1,
    padding: 2,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    height: 50
  },
  foodRecCardBottomComment: {
    flex: 1,
    padding: 10,
    paddingBottom: 1,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    height: 60
  },
  foodRecName: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    color: '#444',
    flex: 1,
    flexDirection: 'column'
  },



////+++++ Food +++++

  foodIcon: {
    width: 100,
    height: 60,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  foodNav: {
    height: 30,
    margin: 5
  },

  foodCard: {
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fafafa'
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    top: 60,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    top: 60,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  },

////+++++ Menu +++++
  menuContainer: {
    top: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profile: {
    height: 275,
    flex: 1
  },

  userProfile: {
    height: 300,
    width: 400
  },
//++++++++++++++++++++++++++
//+++++ GENERAL STYLES +++++
//++++++++++++++++++++++++++

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(212,212,212,.6)',
  },
  welcome: {
    fontSize: 24
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  textInputBox: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 3,
    borderColor: 'grey',
    borderWidth: 1
  },
  inputLabel: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  inputContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  coverImage: {
    height: 300,
    width: 400,
    opacity: 0.5,
    position: 'absolute',
    top: -200,
    right: 0,
    bottom: 0,
    alignSelf: 'stretch',
    left: -100,
  },

////+++++ Buttons +++++
  buttonBlue: {
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 6,
    backgroundColor: '#1da1f2'
  }
});
