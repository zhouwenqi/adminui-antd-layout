import React from 'react'
import type { FormProps } from 'antd'
import { Button, Checkbox, Divider, Flex, Form, Input,theme } from 'antd'
import { useNavigate } from 'react-router';

const {useToken} = theme

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};


const boxStyles:React.CSSProperties = {
    minWidth:"180px",
    width:"100%",
    padding:"2rem",
    maxWidth:"450px",
    borderRadius:"1rem"
}

/**
 * This is just a casual demo
 * @returns 
 */
export default function Login(){
    const {token} = useToken()
    const navigate = useNavigate()

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
        navigate("/")
    }

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <Flex orientation="vertical" align="center" justify="center" style={{width:"100vw",height:"100vh",padding:"1rem",backgroundColor:token.colorBgLayout}}>
            <Flex orientation="vertical"  align="center" justify="center">
                <a href="#"><img src="/vite.svg" style={{width:"60px"}} /></a>
                <h3 style={{marginBlockStart:"0.6rem",marginBlockEnd:"0.1rem"}}>Vite.dev</h3>
                <span style={{marginBlockEnd:"1rem",color:token.colorTextSecondary}}>Log in to the backend</span>
            </Flex>
            <div style={{...boxStyles,backgroundColor:token.colorBgContainer}}>
                <Form
                    name="basic"
                    layout='vertical'
                    initialValues={{ remember: true, layout:"vertical"}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                    <Input />
                    </Form.Item>
                        <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                        <Input.Password />
                    </Form.Item>
                        <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item label={null} style={{paddingBlockEnd:"0px",marginBlockEnd:"0px"}}>                
                        <Button block type="primary" htmlType="submit">
                            Sign in
                        </Button>
                        <Divider>or</Divider>
                        <Button block>
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Flex>
    )
}