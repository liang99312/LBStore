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
                    + "where kc.id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, id);
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
            List parameters = new ArrayList();
            parameters.add(map.get("qy_id"));
            session = getSessionFactory().openSession();
            String sql = "select {kc.*},kh.mc as khmc,gys.mc as gysmc,ck.mc as ckmc,a01.mc as rkrmc,a02.mc as sprmc,wzlb.mc as wzlb from KuCun kc "
                    + "left join CangKu ck on kc.ck_id=ck.id "
                    + "left join KeHu kh on kc.kh_id=kh.id "
                    + "left join GongYingShang gys on kc.gys_id=gys.id "
                    + "left join A01 a01 on kc.rkr_id=a01.id "
                    + "left join A01 a02 on kc.spr_id=a02.id "
                    + "left join WuZiLeiBie wzlb on kc.wzlb_id=wzlb.id "
                    + "where kc.qy_id=?";
            if (map.containsKey("wzmc")) {
                sql += " and kc.wzmc like ?";
                parameters.add("%" + map.get("wzmc") + "%");
            }
            if (map.containsKey("txm")) {
                sql += " and kc.txm like ?";
                parameters.add("%" + map.get("txm") + "%");
            }
            if (map.containsKey("xhgg")) {
                sql += " and kc.xhgg like ?";
                parameters.add("%" + map.get("xhgg") + "%");
            }
            if (map.containsKey("wzlb_id")) {
                sql += " and kc.wzlb_id = ?";
                parameters.add(map.get("wzlb_id"));
            }
            if (map.containsKey("rkr_id")) {
                sql += " and kc.rkr_id = ?";
                parameters.add(map.get("rkr_id"));
            }
            if (map.containsKey("ck_id")) {
                sql += " and kc.ck_id = ?";
                parameters.add(map.get("ck_id"));
            }
            if (map.containsKey("kh_id")) {
                sql += " and kc.kh_id = ?";
                parameters.add(map.get("kh_id"));
            }
            if (map.containsKey("gys_id")) {
                sql += " and kc.gys_id = ?";
                parameters.add(map.get("gys_id"));
            }
            if (map.containsKey("qrq")) {
                sql += " and kc.rksj >= ?";
                parameters.add(map.get("qrq"));
            }
            if (map.containsKey("zrq")) {
                sql += " and kc.rksj <= ?";
                parameters.add(map.get("zrq") + " 23:59:59");
            }
            if (map.containsKey("qsl")) {
                sql += " and kc.syl >= ?";
                parameters.add(map.get("qsl"));
            }
            if (map.containsKey("zsl")) {
                sql += " and kc.syl <= ?";
                parameters.add(map.get("zsl"));
            }
            if (map.containsKey("lqq")) {
                sql += " and datediff(kc.bzrq,now()) <= ?";
                parameters.add(map.get("lqq"));
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
            navtiveSQL.addEntity("kc", KuCun.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("gysmc", StandardBasicTypes.STRING)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("rkrmc", StandardBasicTypes.STRING)
                    .addScalar("sprmc", StandardBasicTypes.STRING)
                    .addScalar("wzlb", StandardBasicTypes.STRING);
            navtiveSQL.setFirstResult(Integer.parseInt(map.get("beginRow").toString()));
            navtiveSQL.setMaxResults(Integer.parseInt(map.get("pageSize").toString()));
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

    public List<KuCun> queryKuCunsTop100(KuCun kuCun) {
        List<KuCun> result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(kuCun.getQy_id());
            session = getSessionFactory().openSession();
            String sql = "select {kc.*},kh.mc as khmc,gys.mc as gysmc,ck.mc as ckmc,a01.mc as rkrmc,a02.mc as sprmc,wzlb.mc as wzlb from KuCun kc "
                    + "left join CangKu ck on kc.ck_id=ck.id "
                    + "left join KeHu kh on kc.kh_id=kh.id "
                    + "left join GongYingShang gys on kc.gys_id=gys.id "
                    + "left join A01 a01 on kc.rkr_id=a01.id "
                    + "left join A01 a02 on kc.spr_id=a02.id "
                    + "left join WuZiLeiBie wzlb on kc.wzlb_id=wzlb.id "
                    + "where kc.qy_id=?";
            if (kuCun.getWzmc() != null && !"".equals(kuCun.getWzmc())) {
                sql += " and kc.wzmc like ?";
                parameters.add("%" + kuCun.getWzmc() + "%");
            }
            if (kuCun.getXhgg() != null && !"".equals(kuCun.getXhgg())) {
                sql += " and kc.xhgg like ?";
                parameters.add("%" + kuCun.getXhgg() + "%");
            }
            if (kuCun.getWzlb_id() != null) {
                sql += " and kc.wzlb_id = ?";
                parameters.add(kuCun.getWzlb_id());
            }
            if (kuCun.getRkr_id() != null) {
                sql += " and kc.rkr_id = ?";
                parameters.add(kuCun.getRkr_id());
            }
            if (kuCun.getCk_id() != null) {
                sql += " and kc.ck_id = ?";
                parameters.add(kuCun.getCk_id());
            }
            if (kuCun.getKh_id() != null) {
                sql += " and kc.kh_id = ?";
                parameters.add(kuCun.getKh_id());
            }
            if (kuCun.getGys_id() != null) {
                sql += " and kc.gys_id = ?";
                parameters.add(kuCun.getGys_id());
            }
            if (kuCun.getQrq() != null) {
                sql += " and kc.rksj >= ?";
                parameters.add(kuCun.getQrq());
            }
            if (kuCun.getZrq() != null) {
                sql += " and kc.rksj <= ?";
                parameters.add(kuCun.getZrq() + " 23:59:59");
            }
            if (kuCun.getSyl() != null && kuCun.getSyl() > 999999) {
                sql += " and kc.syl > ?";
                parameters.add(0);
            }
            sql += " limit 100";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
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

    public List<KuCun> queryYlKuCunsTop100(KuCun kuCun) {
        List<KuCun> result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(kuCun.getQy_id());
            session = getSessionFactory().openSession();
            String sql = "select {kc.*},kh.mc as khmc,gys.mc as gysmc,ck.mc as ckmc,a01.mc as rkrmc,a02.mc as sprmc,wzlb.mc as wzlb from KuCun kc "
                    + "left join CangKu ck on kc.ck_id=ck.id "
                    + "left join KeHu kh on kc.kh_id=kh.id "
                    + "left join GongYingShang gys on kc.gys_id=gys.id "
                    + "left join A01 a01 on kc.rkr_id=a01.id "
                    + "left join A01 a02 on kc.spr_id=a02.id "
                    + "left join WuZiLeiBie wzlb on kc.wzlb_id=wzlb.id "
                    + "where kc.qy_id=? and kc.syzl < kc.zl";
            if (kuCun.getWzmc() != null && !"".equals(kuCun.getWzmc())) {
                sql += " and kc.wzmc like ?";
                parameters.add("%" + kuCun.getWzmc() + "%");
            }
            if (kuCun.getXhgg() != null && !"".equals(kuCun.getXhgg())) {
                sql += " and kc.xhgg like ?";
                parameters.add("%" + kuCun.getXhgg() + "%");
            }
            if (kuCun.getWzlb_id() != null) {
                sql += " and kc.wzlb_id = ?";
                parameters.add(kuCun.getWzlb_id());
            }
            if (kuCun.getRkr_id() != null) {
                sql += " and kc.rkr_id = ?";
                parameters.add(kuCun.getRkr_id());
            }
            if (kuCun.getCk_id() != null) {
                sql += " and kc.ck_id = ?";
                parameters.add(kuCun.getCk_id());
            }
            if (kuCun.getKh_id() != null) {
                sql += " and kc.kh_id = ?";
                parameters.add(kuCun.getKh_id());
            }
            if (kuCun.getGys_id() != null) {
                sql += " and kc.gys_id = ?";
                parameters.add(kuCun.getGys_id());
            }
            if (kuCun.getQrq() != null) {
                sql += " and kc.rksj >= ?";
                parameters.add(kuCun.getQrq());
            }
            if (kuCun.getZrq() != null) {
                sql += " and kc.rksj <= ?";
                parameters.add(kuCun.getZrq() + " 23:59:59");
            }
            sql += " limit 100";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
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
