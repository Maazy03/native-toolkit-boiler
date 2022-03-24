import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Post} from '@axios/AxiosInterceptorFunction';
import {ScrollView} from 'react-native-gesture-handler';
import {URL} from '@config/apiUrl';
import CustomButton from '@components/common/CustomButton';
import ScreenBoiler from '@components/layout/header/ScreenBoiler';
import Toast from '@components/utils/Toast';
import TextInputWithTitle from '@components/common/TextInputWithTitle';

export default function Contact(props) {
  const user = useSelector(state => state.user);

  const [subject, setSubject] = React.useState('');
  const [email, setEmail] = React.useState(user?.user?.email);
  const [comment, setComment] = React.useState('');
  const [subjectError, setSubjectError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [commentError, setCommentError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const url = URL('newsletter/');

  const headerProps = {
    isHeader: true,
    isSubHeader: true,
    mainHeading: 'How can we help you?',
    subHeading: 'Contact Us',
  };

  const onSubmit = async () => {
    setIsLoading(true);

    const userData = {
      subject,
      email,
      comment,
    };
    if (subject?.length === 0 && email?.length === 0 && comment?.length === 0) {
      setEmailError(true);
      setSubjectError(true);
      setCommentError(true);
      setIsLoading(false);
    } else {
      const response = await Post(url, userData);
      const res = response?.data?.doc;
      if (res !== undefined) {
        Toast.show({
          title: 'whoopee!',
          message: 'Request Submitted Successfully',
        });

        setIsLoading(false);
      }
      setEmailError(false);
      setSubjectError(false);
      setCommentError(false);

      setIsLoading(false);
    }
  };

  return (
    <ScreenBoiler headerProps={headerProps} {...props}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.formLayout}>
          <TextInputWithTitle
            secureText={false}
            placeholder={'Subject'}
            placeholdercolor={'#707070'}
            onChangeText={text => {
              setSubject(text);
            }}
            value={subject}
            height={50}
            width={0.9}
            gutterTop={0}
            gutterBottom={10}
            borderColor={'#707070'}
            backgroundColor={'black'}
            color={'white'}
            borderBottomWidth={2}
            formError={subjectError}
            formErrorText={'Empty Field'}
            errorMTop={2}
            errorMBottom={2}
          />

          <TextInputWithTitle
            secureText={false}
            placeholder={'Email Address'}
            placeholdercolor={'#707070'}
            onChangeText={text => {
              setEmail(text);
            }}
            value={email}
            height={50}
            width={0.9}
            gutterTop={5}
            gutterBottom={5}
            borderColor={'#707070'}
            backgroundColor={'black'}
            color={'white'}
            borderBottomWidth={2}
            formError={emailError}
            formErrorText={'Empty Field'}
            errorMTop={2}
            errorMBottom={2}
          />
          <TextInputWithTitle
            secureText={false}
            placeholder={'Message'}
            multiline={true}
            placeholdercolor={'#707070'}
            onChangeText={text => {
              setComment(text);
            }}
            value={comment}
            height={120}
            width={0.9}
            gutterTop={5}
            gutterBottom={commentError ? 1 : 70}
            viewHeight={20}
            inputHeight={90}
            borderColor={'#707070'}
            color={'white'}
            backgroundColor={'black'}
            numberOfLines={10}
            maxLength={250}
            style={{maxWidth: 20}}
            borderWidth={0}
            borderBottomWidth={2}
            formError={commentError}
            formErrorText={'Empty Field'}
            errorMTop={2}
            errorMBottom={20}
          />

          <CustomButton
            value="Send Message"
            bgColor={'#888888'}
            width={'100%'}
            size={'xmd'}
            height={50}
            color={'white'}
            borderRadius={100}
            borderColor={'#000000'}
            loader={isLoading}
            loaderColor={'black'}
            onPress={onSubmit}
          />
        </View>
      </ScrollView>
    </ScreenBoiler>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
  formLayout: {
    marginTop: 120,
  },
});
