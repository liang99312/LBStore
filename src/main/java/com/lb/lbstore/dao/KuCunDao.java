/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.lb.lbstore.domain.KuCun;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

@Repository
public class KuCunDao extends BaseDao {

    public boolean updateKuCun(KuCun kuCun) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            KuCun updataKuCun = (KuCun) session.load(KuCun.class, kuCun.getId());
            if (updataKuCun != null) {
                tx = session.beginTransaction();
                updataKuCun.setCkdj(kuCun.getCkdj());
                updataKuCun.setKw(kuCun.getKw());
                updataKuCun.setTxm(kuCun.getTxm());
                updataKuCun.setBz(kuCun.getBz());
                session.update(updataKuCun);
                session.flush();
                tx.commit();
            }
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
            if (tx != null) {
                tx.rollback();
            }
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }

    public KuCun getKuCunById(Integer id) {
        KuCun kuCun = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {kc.*},kh.mc as khmc,gys.mc as gysmc,ck.mc as ckmc,a01.mc as rkrmc,a02.mc as sprmc,wzlb.mc as wzlb from KuCun kc "
                    + "left join CangKu ck on kc.ck_id=ck.id "
                    + "left join KeHu kh on kc.kh_id=kh.id "
                    + "left join GongYingShang gys on kc.gys_id=gys.id "
                    + "left join A01 a01 on kc.rkr_id=a01.id "
                    + "left join A01 a02 on kc.spr_id=a02.id "
                    + "left join WuZiLeiBie wzlb on kc.wzlb_id=wzlb.id "
                    + "where kc.id=" + id;
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.addEntity("kc", KuCun.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("gysmc", StandardBasicTypes.STRING)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("rkrmc", StandardBasicTypes.STRING)
                    .addScalar("sprmc", StandardBasicTypes.STRING)
                    .addScalar("wzlb", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            List<KuCun> list_kc = new ArrayList();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                KuCun kc = (KuCun) objs[0];
                String khmc = (String) objs[1];
                String gysmc = (String) objs[2];
                String ckmc = (String) objs[3];
                String rkrmc = (String) objs[4];
                String sprmc = (String) objs[5];
                String wzlb = (String) objs[6];
                kc.setKhmc(khmc);
                kc.setCkmc(ckmc);
                kc.setGysmc(gysmc);
                kc.setRkrmc(rkrmc);
                kc.setSprmc(sprmc);
                kc.setWzlb(wzlb);
                list_kc.add(kc);
            }
            if (!list_kc.isEmpty()) {
                kuCun = list_kc.get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return kuCun;
    }

    public List<KuCun> queryKuCunsByPage(HashMap map) {
        List<KuCun> result = new ArrayList();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {kc.*},kh.mc as khmc,gys.mc as gysmc,ck.mc as ckmc,a01.mc as rkrmc,a02.mc as sprmc,wzlb.mc as wzlb from KuCun kc "
                    + "left join CangKu ck on kc.ck_id=ck.id "
                    + "left join KeHu kh on kc.kh_id=kh.id "
                    + "left join GongYingShang gys on kc.gys_id=gys.id "
                    + "left join A01 a01 on kc.rkr_id=a01.id "
                    + "left join A01 a02 on kc.spr_id=a02.id "
                    + "left join WuZiLeiBie wzlb on kc.wzlb_id=wzlb.id "
                    + "where kc.qy_id=" + map.get("qy_id");
            if (map.containsKey("wzmc")) {
                sql += " and kc.wzmc like '%" + map.get("wzmc") + "%'";
            }
            if (map.containsKey("xhgg")) {
                sql += " and kc.xhgg like '%" + map.get("xhgg") + "%'";
            }
            if (map.containsKey("wzlb_id")) {
                sql += " and kc.wzlb_id = " + map.get("wzlb_id");
            }
            if (map.containsKey("rkr_id")) {
                sql += " and kc.rkr_id = " + map.get("rkr_id");
            }
            if (map.containsKey("ck_id")) {
                sql += " and kc.ck_id = " + map.get("ck_id");
            }
            if (map.containsKey("kh_id")) {
                sql += " and kc.kh_id = " + map.get("kh_id");
            }
            if (map.containsKey("gys_id")) {
                sql += " and kc.gys_id = " + map.get("gys_id");
            }
            if (map.containsKey("qrq")) {
                sql += " and kc.rksj > '" + map.get("qrq") + "'";
            }
            if (map.containsKey("zrq")) {
                sql += " and kc.rksj <= '" + map.get("zrq") + " 23:59:59'";
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.addEntity("kc", KuCun.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("gysmc", StandardBasicTypes.STRING)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("rkrmc", StandardBasicTypes.STRING)
                    .addScalar("sprmc", StandardBasicTypes.STRING)
                    .addScalar("wzlb", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                KuCun kc = (KuCun) objs[0];
                String khmc = (String) objs[1];
                String gysmc = (String) objs[2];
                String ckmc = (String) objs[3];
                String rkrmc = (String) objs[4];
                String sprmc = (String) objs[5];
                String wzlb = (String) objs[6];
                kc.setKhmc(khmc);
                kc.setCkmc(ckmc);
                kc.setGysmc(gysmc);
                kc.setRkrmc(rkrmc);
                kc.setSprmc(sprmc);
                kc.setWzlb(wzlb);
                result.add(kc);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
        }
        return result;
    }
}
