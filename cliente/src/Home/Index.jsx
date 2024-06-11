import React, {Fragment} from 'react';
import {SearchBar, Tabs} from "antd-mobile";

const Index = () => {
    const onSearch = (val) => {
        console.log(val)
    }
    return (
        <Fragment>
            <div className={'w-full h-[95%]'}>
                <div className={'w-full h-20 p-2'}>
                    <SearchBar
                        className={'w-[350px] mt-2 ml-2'}
                        placeholder='搜索你想听的音乐'
                        onSearch={onSearch}
                        style={{
                            '--border-radius': '100px',
                            '--background': '#ffffff',
                            '--height': '40px',
                            '--padding-left': '12px',
                        }}
                    />
                </div>
                <div className={'w-full h-20 p-2'}>
                    <div className={'w-full flex *:m-2 overflow-auto'}>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                        <div>1231</div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Index;