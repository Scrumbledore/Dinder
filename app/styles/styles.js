import { StyleSheet } from 'react-native';

export default StyleSheet.create({

//++++++++++++++++++++++++++++++
//+++++ COMPONENT SPECIFIC +++++
//++++++++++++++++++++++++++++++

////+++++ Routing +++++


////+++++ Food +++++

  foodButtons: {
    width: 80,
    height: 80,
    borderWidth: 10,
    borderColor: '#e7e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40
  },
  foodButtonSmall: {
    width: 50,
    height: 50,
    borderWidth: 10,
    borderColor: '#e7e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  foodCard: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#e3e3e3',
    width: 350,
    height: 420,
  },

//++++++++++++++++++++++++++
//+++++ GENERAL STYLES +++++
//++++++++++++++++++++++++++

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7'
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
