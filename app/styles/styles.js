import { StyleSheet } from 'react-native';

export default StyleSheet.create({

//++++++++++++++++++++++++++++++
//+++++ COMPONENT SPECIFIC +++++
//++++++++++++++++++++++++++++++

////+++++ Routing +++++



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

//++++++++++++++++++++++++++
//+++++ GENERAL STYLES +++++
//++++++++++++++++++++++++++

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4d4d4',
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
    alignItems: 'center'
  },

////+++++ Buttons +++++
  buttonBlue: {
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 6,
    backgroundColor: 'steelblue'
  }
});
