import React, { useCallback } from 'react';
import { Container, Header } from '@pages/DirectMessage/styles';
import gravatar from 'gravatar';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router';
import useInput from '@hooks/useInput';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import axios from 'axios';
import { IDM } from '@typings/db';

const DirectMessage = () => {
    const { workspace, id } = useParams<{ workspace: string, id: string }>();
    const { data: userData } = useSWR(`http://localhost:3095/api/workspaces/${workspace}/users/${id}`, fetcher);
    const { data: myData } = useSWR(`http://localhost:3095/api/users`, fetcher);
    const [chat, onChangeChat, setChat] = useInput('');
    const { data: chatData, mutate: chatMutate } = useSWR<IDM[]>(`http://localhost:3095/api/workspace/${workspace}/dms/${id}/chats?perPage=20&page=1`, fetcher);

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();

        if (chat?.trim()) {
            axios.post(`http://localhost:3095/api/workspace/${workspace}/dms/${id}/chats`, {
                content: chat,
            })
                .then(() => {
                    chatMutate();
                    setChat('');
                })
                .catch(console.error)
        }
    }, [chat]);

    if (!userData || !myData) return null;

    return (
        <Container>
            <Header>
                <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
                <span>{userData.nickname}</span>
            </Header>
            <ChatList />
            <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
        </Container>
    );
};

export default DirectMessage;