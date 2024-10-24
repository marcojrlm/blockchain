import React, {useEffect, useState} from 'react';
import * as S from "@/styles";
import {useForm} from "react-hook-form";
import Mining from "@/app/components/Mining";

const Block = ({block, validateChain, isInvalidBlock}: {
    block: IBlock,
    validateChain: () => Promise<void>,
    isInvalidBlock: boolean
}) => {
    const {register, setValue, watch, handleSubmit} = useForm<IBlock>({
        defaultValues: {
            nonce: block.nonce,
            data: block.data,
            hash: block.hash,
            previousHash: block.previousHash,
        }
    });
    const [isMounted, setIsMounted] = useState(false);
    const [isMining, setIsMining] = useState(false);
    const baseUrl = process.env.BASE_URL || 'http://localhost:8080/api/blockchain';
    const nonceWatch = watch('nonce');
    const dataWatch = watch('data');

    async function updateBlock() {
        const payload = {
            id: block.id,
            nonce: nonceWatch,
            data: dataWatch,
        };
        try {
            const request = await fetch(baseUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const response = await request.json();
            setValue('hash', response.hash);
            await validateChain()
        } catch (error) {
            console.warn(error);
        }
    }

    useEffect(() => {
        if (isMounted) {
            (async () => updateBlock())()
        } else {
            setIsMounted(true)
        }
    }, [nonceWatch, dataWatch])

    async function onSubmit(data: IBlock) {
        data.id = block.id;
        try {
            setIsMining(true);
            const request = await fetch(baseUrl + '/mine', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const response = await request.json();
            setValue('hash', response.hash);
            setValue('nonce', response.nonce);
            setValue('previousHash', response.previousHash);
            await validateChain()
        } catch (error) {
            console.warn(error);
        } finally {
            setIsMining(false);
        }
    }

    return (
        !isMining ?
            <S.Block isInvalidBlock={isInvalidBlock}>
                <S.Form onSubmit={handleSubmit(onSubmit)}>
                    <p>{block.id !== 0 ? 'Bloco ' + block.id : 'Genesis block'}</p>
                    <S.Column>
                        <S.Label>Nonce</S.Label>
                        <S.Input placeholder='nonce' type='number' {...register('nonce')}/>
                    </S.Column>

                    <S.Column>
                        <S.Label>Data</S.Label>
                        <S.Input placeholder='data' {...register('data')} />
                    </S.Column>

                    <S.Column>
                        <S.Label>Hash</S.Label>
                        <S.Input placeholder='hash' $block={true}  {...register('hash')}/>
                    </S.Column>

                    <S.Column>
                        <S.Label>previousHash</S.Label>
                        <S.Input placeholder='previousHash' $block={true} {...register('previousHash')}/>
                    </S.Column>

                    <S.Button type="submit">Mine</S.Button>
                </S.Form>
            </S.Block>
            : <Mining/>
    )
};

export default Block;

export interface IBlock {
    id: number;
    nonce: number;
    data: string;
    hash: string;
    previousHash: string;
}