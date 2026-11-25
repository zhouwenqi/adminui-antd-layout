import { Container } from "@adminui-dev/antd-layout";
import { useState } from 'react';
import { Button, Flex, Timeline } from 'antd';

/**
 * This is just a casual demo
 * @returns 
 */
export default function(){
    const [reverse, setReverse] = useState(false);
    const handleClick = () => {
        setReverse(!reverse);
    };
    return(
        <Container mode="panel">
            <Flex vertical gap="middle" align="flex-start">
                <Timeline
                    reverse={reverse}
                    items={[
                    {
                        content: 'Create a services site 2015-09-01',
                    },
                    {
                        content: 'Solve initial network problems 2015-09-01',
                    },
                    {
                        content: 'Technical testing 2015-09-01',
                    },
                    {
                        loading: true,
                        content: 'Recording...',
                    },
                    ]}
                />
                <Button type="primary" onClick={handleClick}>
                    Toggle Reverse
                </Button>
            </Flex>
        </Container>
    )
}