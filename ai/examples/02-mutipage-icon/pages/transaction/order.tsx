import { Button, Result } from 'antd';
import { Container } from '@adminui-dev/antd-layout';

/**
 * This is just a casual demo
 * @returns 
 */
export default function(){
    return(
        <Container mode='panel'>
            <Result
                status="success"
                title="Successfully Purchased Antd-layout!"
                subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                extra={[
                <Button type="primary" key="console">
                    Go Console
                </Button>,
                <Button key="buy">Buy Again</Button>,
                ]}
            />
        </Container>
    )
}