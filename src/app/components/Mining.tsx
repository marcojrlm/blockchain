import React from 'react';
import * as S from "@/styles";
import Skeleton from "@/app/components/Skeleton";

const Mining = () => {
    return (
        <S.Block>
            <S.Form>
                <>
                    <p>Mining...</p>
                    <S.Column>
                        <S.Label>Nonce</S.Label>
                        <Skeleton/>
                    </S.Column>

                    <S.Column>
                        <S.Label>Data</S.Label>
                        <Skeleton/>
                    </S.Column>

                    <S.Column>
                        <S.Label>Hash</S.Label>
                        <Skeleton/>
                    </S.Column>
                    <S.Column>
                        <S.Label>previousHash</S.Label>
                        <Skeleton/>
                    </S.Column>
                    <S.Button>Mining...</S.Button>
                </>
            </S.Form>
        </S.Block>
    );
};

export default Mining;