import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import {
  Button,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right
} from "native-base";


export default class Screen3 extends React.Component {

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>HomeScreen</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
        <Text>I am Login Screen</Text>

        <Text
          style={styles.linky}
          onPress={() => this.props.navigation.navigate('signupScreen',this.state)} >
          Go to Signup
        </Text>

              </Body>
            </CardItem>
          </Card>

            <Text>Goto Profiles</Text>
          
        </Content>
      </Container>      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})