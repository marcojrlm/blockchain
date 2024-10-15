import React, {useEffect, useState} from 'react';
import * as S from "@/styles";
import {useForm} from "react-hook-form";
import Block, {IBlock} from "@/app/components/Block";
import Skeleton from "@/app/components/Skeleton";

const Blockchain = () => {
    const {register, handleSubmit, reset} = useForm<{ data: string }>();
    const [isMining, setIsMining] = useState(false);
    const baseUrl = process.env.BASE_URL || 'http://localhost:8080/api/blockchain';
    const [invalidBlockIndex, setInvalidBlockIndex] = useState<number>();

    async function onSubmit(data: { data: string }) {
        try {
            setIsMining(true);
            await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            await getBlockChain();
            reset();
        } catch (error) {
            console.warn(error);
        } finally {
            setIsMining(false);
        }
    }

    const [blockchain, setBlockChain] = useState<Array<IBlock>>([]);

    async function getBlockChain() {
        try {
            const request = await fetch(baseUrl);
            const response = await request.json();
            setBlockChain(response);
        } catch (error) {
            console.warn(error)
        }
    }

    useEffect(() => {
        (async () => await getBlockChain())();
        (async () => await validateChain())();
    }, [])

    async function validateChain() {
        try {
            const request = await fetch(baseUrl + '/validate');
            const response = await request.json();
            console.log(response);
            if (response >= 0) {
                setInvalidBlockIndex(response);
            } else {
                setInvalidBlockIndex(undefined);
            }
        } catch (error) {
            console.warn(error)
        }
    }

    async function deleteBlockChain() {
        try {
            await fetch(baseUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setBlockChain([]);
            await getBlockChain();
            setInvalidBlockIndex(undefined);
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <S.Blockchain>
            <>
                <S.Trash className="material-symbols-outlined" onClick={() => deleteBlockChain()}
                         title='Deletar blockchain'>
                    delete
                </S.Trash>
                {
                    blockchain && blockchain.length >= 0 &&
                    blockchain.map((block, index) => {
                        return (
                            <Block key={index} block={block}
                                   isInvalidBlock={(invalidBlockIndex !== undefined && block.id >= invalidBlockIndex)}
                                   validateChain={validateChain}/>
                        )
                    })
                }
                <S.Block>
                    <S.Form onSubmit={handleSubmit(onSubmit)}>
                        {
                            isMining ?
                                <>
                                    <p>Mining...</p>
                                    <S.Row>
                                        <S.Label>Nonce</S.Label>
                                        <Skeleton/>
                                    </S.Row>

                                    <S.Row>
                                        <S.Label>Data</S.Label>
                                        <Skeleton/>
                                    </S.Row>

                                    <S.Row>
                                        <S.Label>Hash</S.Label>
                                        <Skeleton/>
                                    </S.Row>
                                </>
                                :
                                <>
                                    <p>New block</p>
                                    <S.Input placeholder='data' {...register('data')} autoFocus={true}/>
                                    <S.Button type="submit">Mine</S.Button>
                                </>
                        }
                    </S.Form>
                </S.Block>
            </>
        </S.Blockchain>
    );
};

export default Blockchain;