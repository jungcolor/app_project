import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar';
import fetcher from '@utils/fetcher';
import loadable from '@loadable/component';
import React, { FC, useCallback } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from '@layouts/Workspace/styles';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: FC = ({ children }) => {
    const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher, {
        dedupingInterval: 2000, // 2초
    });

    const onLogout = useCallback(() => {
        axios.post("http://localhost:3095/api/users/logout", null, {
            withCredentials: true
        })
            .then(() => {
                mutate(false, false);
            });
    }, []);

    if (!data) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span>
                        <ProfileImg src={gravatar.url(data.nickname, { s: "28px", d: "retro" })} alt={data.nickname} />
                    </span>
                </RightMenu>
            </Header>
            <button onClick={onLogout}>로그아웃</button>
            <WorkspaceWrapper>
                <Workspaces>test</Workspaces>
                <Channels>
                    <WorkspaceName>Select</WorkspaceName>
                    <MenuScroll>Menu Scroll</MenuScroll>
                </Channels>
                <Chats>
                    <Switch>
                        {/* 폴더가 계층구조일 때 중첩 라우팅으로 사용할 수 있다 */}
                        <Route path="/workspace/channel" component={Channel} />
                        <Route path="/workspace/dm" component={DirectMessage} />
                    </Switch>
                </Chats>
            </WorkspaceWrapper>
            {children}
        </div>
    );
};

export default Workspace;