import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar';
import fetcher from '@utils/fetcher';
import loadable from '@loadable/component';
import React, { FC, useCallback, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Channels, Chats, Header, LogOutButton, MenuScroll, ProfileImg, ProfileModal, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from '@layouts/Workspace/styles';
import Menu from '@components/Menu';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: FC = ({ children }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
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

    const onClickUserProfile = useCallback(() => {
        setShowUserMenu((prev) => !prev);
    }, []);

    if (!data) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span onClick={onClickUserProfile}>
                        <ProfileImg src={gravatar.url(data.nickname, { s: "28px", d: "retro" })} alt={data.nickname} />
                        {showUserMenu &&
                            <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                                <ProfileModal>
                                    <img src={gravatar.url(data.nickname, { s: "36px", d: "retro" })} alt={data.nickname} />
                                    <div>
                                        <span id="profile-name">{data.nickname}</span>
                                        <span id="profile-active">Active</span>
                                    </div>
                                </ProfileModal>
                                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
                            </Menu>
                        }
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