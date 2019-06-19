/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.lb.lbstore.domain.RuKuFei;
import com.lb.lbstore.domain.KuCun;
import com.lb.lbstore.domain.RuKu;
import com.lb.lbstore.domain.RuKuDetail;
import com.lb.lbstore.domain.WuZiXhgg;
import com.lb.lbstore.domain.WuZiZiDian;
import com.lb.lbstore.util.LshUtil;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

@Repository
public class RuKuDao extends BaseDao {

    public RuKu getRuKuWithDetailById(Integer id) {
        RuKu ruKu = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {rk.*},kh.mc as khmc,gys.mc as gysmc,ck.mc as ckmc,a01.mc as rkrmc,a02.mc as sprmc from RuKu rk "
                    + "left join CangKu ck on rk.ck_id=ck.id "
                    + "left join KeHu kh on rk.kh_id=kh.id "
                    + "left join GongYingShang gys on rk.gys_id=gys.id "
                    + "left join A01 a01 on rk.rkr_id=a01.id "
                    + "left join A01 a02 on rk.spr_id=a02.id "
                    + "where rk.id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, id);
            navtiveSQL.addEntity("rk", RuKu.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("gysmc", StandardBasicTypes.STRING)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("rkrmc", StandardBasicTypes.STRING)
                    .addScalar("sprmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            List<RuKu> list_rk = new ArrayList();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                RuKu rk = (RuKu) objs[0];
                String khmc = (String) objs[1];
                String gysmc = (String) objs[2];
                String ckmc = (String) objs[3];
                String rkrmc = (String) objs[4];
                String sprmc = (String) objs[5];
                rk.setKhmc(khmc);
                rk.setCkmc(ckmc);
                rk.setGysmc(gysmc);
                rk.setRkrmc(rkrmc);
                rk.setSprmc(sprmc);
                list_rk.add(rk);
            }
            if (list_rk.isEmpty()) {
                return null;
            }
            ruKu = list_rk.get(0);

            String sql_d = "select {d.*},l.mc as wzlb from RuKuDetail d left join WuZiLeiBie l on d.wzlb_id=l.id where d.rk_id=?";
            SQLQuery navtiveSQL_d = session.createSQLQuery(sql_d);
            navtiveSQL_d.setParameter(0, id);
            navtiveSQL_d.addEntity("d", RuKuDetail.class).addScalar("wzlb", StandardBasicTypes.STRING);
            List<RuKuDetail> details = new ArrayList();
            List list_d = navtiveSQL_d.list();
            for (Object obj : list_d) {
                Object[] objs = (Object[]) obj;
                RuKuDetail rkd = (RuKuDetail) objs[0];
                String wzlb = (String) objs[1];
                rkd.setWzlb(wzlb);
                details.add(rkd);
            }
            ruKu.setDetails(details);
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
        return ruKu;
    }

    public RuKuDetail getRuKuDetailById(Integer id) {
        RuKuDetail ruKuDetail = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {rkd.*},kh.mc as khmc,ck.mc as ckmc,rk.spsj as sj,rk.lsh as lsh,a01.mc as rkrmc,l.mc as wzlb from RuKuDetail rkd "
                    + "left join RuKu rk on rkd.rk_id=rk.id "
                    + "left join CangKu ck on rkd.ck_id=ck.id "
                    + "left join KeHu kh on rk.kh_id=kh.id "
                    + "left join A01 a01 on rk.rkr_id=a01.id "
                    + "left join WuZiLeiBie l on rkd.wzlb_id=l.id "
                    + "where rkd.id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, id);
            navtiveSQL.addEntity("rkd", RuKuDetail.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("sj", StandardBasicTypes.DATE)
                    .addScalar("lsh", StandardBasicTypes.STRING)
                    .addScalar("rkrmc", StandardBasicTypes.STRING)
                    .addScalar("wzlb", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                ruKuDetail = (RuKuDetail) objs[0];
                String khmc = (String) objs[1];
                String ckmc = (String) objs[2];
                Date sj = (Date) objs[3];
                String lsh = (String) objs[4];
                String rkrmc = (String) objs[5];
                String wzlb = (String) objs[6];
                ruKuDetail.setKhmc(khmc);
                ruKuDetail.setCkmc(ckmc);
                ruKuDetail.setSj(sj);
                ruKuDetail.setLsh(lsh);
                ruKuDetail.setRkrmc(rkrmc);
                ruKuDetail.setWzlb(wzlb);
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
        return ruKuDetail;
    }

    public List<RuKuDetail> queryRuKuDetailsTop100(RuKuDetail detail) {
        List<RuKuDetail> result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(detail.getQy_id());
            session = getSessionFactory().openSession();
            String sql = "select {rkd.*},kh.mc as khmc,ck.mc as ckmc,rk.spsj as sj,rk.lsh as lsh,a01.mc as rkrmc,l.mc as wzlb from RuKuDetail rkd "
                    + "left join RuKu rk on rkd.rk_id=rk.id "
                    + "left join CangKu ck on rkd.ck_id=ck.id "
                    + "left join KeHu kh on rk.kh_id=kh.id "
                    + "left join A01 a01 on rk.rkr_id=a01.id "
                    + "left join WuZiLeiBie l on rkd.wzlb_id=l.id "
                    + "where rk.qy_id=?";
            if (detail.getLsh() != null && !"".equals(detail.getLsh())) {
                sql += " and rk.lsh = '?'";
                parameters.add(detail.getLsh());
            }
            if (detail.getCk_id() != null) {
                sql += " and rkd.ck_id = ?";
                parameters.add(detail.getCk_id());
            }
            if (detail.getWzlb_id() != null) {
                sql += " and rkd.wzlb_id = ?";
                parameters.add(detail.getWzlb_id());
            }
            if (detail.getWzmc() != null && !"".equals(detail.getWzmc())) {
                sql += " and rkd.wzmc = '?'";
                parameters.add(detail.getWzmc());
            }
            if (detail.getXhgg() != null && !"".equals(detail.getXhgg())) {
                sql += " and rkd.xhgg = '?'";
                parameters.add(detail.getXhgg());
            }
            if (detail.getKh_id() != null) {
                sql += " and rkd.kh_id = ?";
                parameters.add(detail.getKh_id());
            }
            if (detail.getGys_id() != null) {
                sql += " and rkd.ck_id = ?";
                parameters.add(detail.getGys_id());
            }
            if (detail.getRkr_id() != null) {
                sql += " and rk.rkr_id = ?";
                parameters.add(detail.getRkr_id());
            }
            if (detail.getTxm() != null && !"".equals(detail.getTxm())) {
                sql += " and rkd.txm = '?'";
                parameters.add(detail.getTxm());
            }
            if (detail.getQrq() != null && !"".equals(detail.getQrq())) {
                sql += " and rk.spsj >= '?'";
                parameters.add(detail.getQrq());
            }
            if (detail.getZrq() != null && !"".equals(detail.getZrq())) {
                sql += " and rk.spsj <= '?'";
                parameters.add(detail.getZrq() + " 23:59:59");
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
            navtiveSQL.addEntity("rkd", RuKuDetail.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("sj", StandardBasicTypes.DATE)
                    .addScalar("lsh", StandardBasicTypes.STRING)
                    .addScalar("rkrmc", StandardBasicTypes.STRING)
                    .addScalar("wzlb", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                RuKuDetail rkd = (RuKuDetail) objs[0];
                String khmc = (String) objs[1];
                String ckmc = (String) objs[2];
                Date sj = (Date) objs[3];
                String lsh = (String) objs[4];
                String rkrmc = (String) objs[5];
                String wzlb = (String) objs[6];
                rkd.setKhmc(khmc);
                rkd.setCkmc(ckmc);
                rkd.setSj(sj);
                rkd.setLsh(lsh);
                rkd.setRkrmc(rkrmc);
                rkd.setWzlb(wzlb);
                result.add(rkd);
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

    public List<RuKuDetail> queryRuKuDetailTop100(Integer wzzd_id) {
        List<RuKuDetail> details = new ArrayList<>();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql_d = "select {d.*},l.mc as wzlb from RuKuDetail d left join WuZiLeiBie l on d.wzlb_id=l.id where d.wzzd_id=? order by d.id desc limit 0,100";
            SQLQuery navtiveSQL_d = session.createSQLQuery(sql_d);
            navtiveSQL_d.setParameter(0, wzzd_id);
            navtiveSQL_d.addEntity("d", RuKuDetail.class).addScalar("wzlb", StandardBasicTypes.STRING);
            List list_d = navtiveSQL_d.list();
            for (Object obj : list_d) {
                Object[] objs = (Object[]) obj;
                RuKuDetail rkd = (RuKuDetail) objs[0];
                String wzlb = (String) objs[1];
                rkd.setWzlb(wzlb);
                details.add(rkd);
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
        return details;
    }

    public List<RuKu> queryRuKusByPage(HashMap map) {
        List<RuKu> result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(map.get("qy_id"));
            session = getSessionFactory().openSession();
            String sql = "select {rk.*},kh.mc as khmc,gys.mc as gysmc,ck.mc as ckmc from RuKu rk "
                    + "left join CangKu ck on rk.ck_id=ck.id left join KeHu kh on rk.kh_id=kh.id left join GongYingShang gys on rk.gys_id=gys.id "
                    + "where rk.qy_id=?";
            if (map.containsKey("ck_id")) {
                sql += " and rk.ck_id = ?";
                parameters.add(map.get("ck_id"));
            }
            if (map.containsKey("lsh")) {
                sql += " and rk.lsh like '%?%'";
                parameters.add(map.get("lsh"));
            }
            if (map.containsKey("wz")) {
                sql += " and rk.wz like '%?%'";
                parameters.add(map.get("wz"));
            }
            if (map.containsKey("state")) {
                sql += " and rk.state = ?";
                parameters.add(map.get("state"));
            }
            if (map.containsKey("kh_id")) {
                sql += " and rk.kh_id = ?";
                parameters.add(map.get("kh_id"));
            }
            if (map.containsKey("gys_id")) {
                sql += " and rk.gys_id = ?";
                parameters.add(map.get("gys_id"));
            }
            if (map.containsKey("qrq")) {
                sql += " and rk.sj >= '?'";
                parameters.add(map.get("qrq"));
            }
            if (map.containsKey("zrq")) {
                sql += " and rk.sj <= '?'";
                parameters.add(map.get("zrq") + " 23:59:59");
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
            navtiveSQL.addEntity("rk", RuKu.class).addScalar("khmc", StandardBasicTypes.STRING).addScalar("gysmc", StandardBasicTypes.STRING).addScalar("ckmc", StandardBasicTypes.STRING);
            navtiveSQL.setFirstResult(Integer.parseInt(map.get("beginRow").toString()));
            navtiveSQL.setMaxResults(Integer.parseInt(map.get("pageSize").toString()));
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                RuKu rk = (RuKu) objs[0];
                String khmc = (String) objs[1];
                String gysmc = (String) objs[2];
                String ckmc = (String) objs[3];
                rk.setKhmc(khmc);
                rk.setCkmc(ckmc);
                rk.setGysmc(gysmc);
                result.add(rk);
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

    public Integer saveRuKu(RuKu ruKu) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            ruKu.setDfje(ruKu.getJe() - ruKu.getYfje());
            Integer id = (Integer) session.save(ruKu);
            session.flush();
            for (RuKuDetail detail : ruKu.getDetails()) {
                Integer zd_id = detail.getWzzd_id();
                if (detail.getWzzd_id() < 1) {
                    WuZiZiDian zd = new WuZiZiDian();
                    zd.setDw(detail.getDw());
                    zd.setMc(detail.getWzmc());
                    zd.setBm(detail.getWzbm());
                    zd.setQy_id(ruKu.getQy_id());
                    zd.setState(0);
                    zd.setWzlb_id(detail.getWzlb_id());
                    zd_id = (Integer) session.save(zd);
                    session.flush();
                    detail.setWzzd_id(zd_id);
                }
                Integer xhgg_id = detail.getXhgg_id();
                if (detail.getXhgg_id() < 1) {
                    WuZiXhgg xhgg = new WuZiXhgg();
                    xhgg.setBzq(detail.getBzq());
                    xhgg.setMc(detail.getXhgg());
                    xhgg.setQy_id(ruKu.getQy_id());
                    xhgg.setWzzd_id(zd_id);
                    xhgg_id = (Integer) session.save(xhgg);
                    session.flush();
                    detail.setXhgg_id(xhgg_id);
                }

                detail.setCk_id(ruKu.getCk_id());
                detail.setDh(ruKu.getDh());
                detail.setGys_id(ruKu.getGys_id());
                detail.setKh_id(ruKu.getKh_id());
                detail.setLy(ruKu.getLy());
                detail.setQy_id(ruKu.getQy_id());
                detail.setRk_id(id);
                session.save(detail);
            }
            session.flush();
            tx.commit();
            result = id;
        } catch (Exception e) {
            tx.rollback();
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

    public boolean updateRuKu(RuKu ruKu) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            ruKu.setDfje(ruKu.getJe() - ruKu.getYfje());
            session.update(ruKu);
            session.flush();
            String deleteDetail = "delete from RuKuDetail where rk_id=?";
            session.createSQLQuery(deleteDetail).setParameter(0, ruKu.getId()).executeUpdate();
            session.flush();
            for (RuKuDetail detail : ruKu.getDetails()) {
                Integer zd_id = detail.getWzzd_id();
                if (detail.getWzzd_id() < 1) {
                    WuZiZiDian zd = new WuZiZiDian();
                    zd.setDw(detail.getDw());
                    zd.setMc(detail.getWzmc());
                    zd.setBm(detail.getWzbm());
                    zd.setQy_id(ruKu.getQy_id());
                    zd.setState(0);
                    zd.setWzlb_id(detail.getWzlb_id());
                    zd_id = (Integer) session.save(zd);
                    session.flush();
                    detail.setWzzd_id(zd_id);
                }
                Integer xhgg_id = detail.getXhgg_id();
                if (detail.getXhgg_id() < 1) {
                    WuZiXhgg xhgg = new WuZiXhgg();
                    xhgg.setBzq(detail.getBzq());
                    xhgg.setMc(detail.getXhgg());
                    xhgg.setQy_id(ruKu.getQy_id());
                    xhgg.setWzzd_id(zd_id);
                    xhgg_id = (Integer) session.save(xhgg);
                    session.flush();
                    detail.setXhgg_id(xhgg_id);
                }

                detail.setCk_id(ruKu.getCk_id());
                detail.setDh(ruKu.getDh());
                detail.setGys_id(ruKu.getGys_id());
                detail.setKh_id(ruKu.getKh_id());
                detail.setLy(ruKu.getLy());
                detail.setQy_id(ruKu.getQy_id());
                detail.setRk_id(ruKu.getId());
                session.save(detail);
            }
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
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

    public boolean deleteRuKu(Integer id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteDetail = "delete from RuKuDetail where rk_id=?";
            session.createSQLQuery(deleteDetail).setParameter(0, id).executeUpdate();
            String deleteRk = "delete from RuKu where id=?";
            session.createSQLQuery(deleteRk).setParameter(0, id).executeUpdate();
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
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

    public boolean dealRuKu(RuKu ruKu, Integer a01_id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String sql = "from RuKuDetail where rk_id=?";
            List<RuKuDetail> list = session.createQuery(sql).setParameter(0, ruKu.getId()).list();
            for (RuKuDetail d : list) {
                RuKuDetail detail = null;
                for (RuKuDetail e : ruKu.getDetails()) {
                    if (Objects.equals(e.getId(), d.getId())) {
                        detail = e;
                        break;
                    }
                }
                if (detail == null) {
                    continue;
                }
                d.setKw(detail.getKw());
                d.setDj(detail.getDj());

                session.update(d);

                Calendar c = Calendar.getInstance();
                c.setTime(d.getScrq());
                if (d.getBzq() == null) {
                    d.setBzq(-1);
                }
                c.add(Calendar.DATE, Integer.parseInt("" + d.getBzq()));

                KuCun kc = new KuCun();
                kc.setBzq(d.getBzq());
                if (d.getBzq() > 0) {
                    kc.setBzrq(c.getTime());
                }
                kc.setCk_id(d.getCk_id());
                kc.setDh(d.getDh());
                kc.setDj(d.getDj());
                kc.setDw(d.getDw());
                kc.setDymx(d.getDymx());
                kc.setGys_id(d.getGys_id());
                kc.setJlfs(d.getJlfs());
                kc.setKh_id(d.getKh_id());
                kc.setRkr_id(ruKu.getRkr_id());
                kc.setLy(d.getLy());
                kc.setPp(d.getPp());
                kc.setQy_id(d.getQy_id());
                kc.setRk_id(d.getRk_id());
                kc.setRkd_id(d.getId());
                kc.setScc(d.getScc());
                kc.setBz(d.getBz());
                kc.setScrq(d.getScrq());
                kc.setPc(d.getPc());
                kc.setSl(d.getSl());
                kc.setSpr_id(a01_id);
                kc.setTxm(d.getTxm());
                kc.setTysx(d.getTysx());
                kc.setWzlb_id(d.getWzlb_id());
                kc.setWzmc(d.getWzmc());
                kc.setWzbm(d.getWzbm());
                kc.setWzzd_id(d.getWzzd_id());
                kc.setXhgg(d.getXhgg());
                kc.setXhgg_id(d.getXhgg_id());
                if ("pt".equals(kc.getJlfs())) {
                    d.setZl(d.getSl());
                    d.setZldw(d.getDw());
                    d.setBzgg(1.0D);
                }
                kc.setBzgg(d.getBzgg());
                kc.setZl(d.getZl());
                kc.setZldw(d.getZldw());
                kc.setSyl(kc.getSl());
                kc.setSyzl(kc.getZl());
                kc.setKw(d.getKw());
                kc.setRksj(new Date());

                Integer kc_id = (Integer) session.save(kc);
                session.flush();
                d.setKc_id(kc_id);
                session.update(d);
            }
            session.flush();
            ruKu = (RuKu) session.load(RuKu.class, ruKu.getId());
            ruKu.setState(1);
            ruKu.setSpr_id(a01_id);
            ruKu.setSpsj(new Date());
            ruKu.setLsh(LshUtil.getRkdLsh());
            ruKu.setDfje(ruKu.getJe() - ruKu.getYfje());
            session.update(ruKu);
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
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

    public boolean deleteRuKuFei(Integer id, Integer rk_id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteFei = "delete from RuKuFei where id=?";
            session.createSQLQuery(deleteFei).setParameter(0, id).executeUpdate();
            session.flush();
            String updateRuKu = "update ruku set yfje = ifnull((select sum(ifnull(f.je,0)) from rukufei f where f.rk_id = ?),0) where ruku.id=?";
            session.createSQLQuery(updateRuKu).setParameter(0, rk_id).setParameter(1, rk_id).executeUpdate();
            session.flush();
            updateRuKu = "update ruku set dfje = je - yfje where id=?";
            session.createSQLQuery(updateRuKu).setParameter(0, rk_id).executeUpdate();
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
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

    public Integer saveRuKuFei(RuKuFei ruKuFei) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            Integer id = (Integer) session.save(ruKuFei);
            session.flush();
            int rk_id = ruKuFei.getRk_id();
            String updateRuKu = "update ruku set yfje = ifnull((select sum(ifnull(f.je,0)) from rukufei f where f.rk_id =?),0) where ruku.id=?";
            session.createSQLQuery(updateRuKu).setParameter(0, rk_id).setParameter(1, rk_id).executeUpdate();
            session.flush();
            updateRuKu = "update ruku set dfje = je - yfje where id=?";
            session.createSQLQuery(updateRuKu).setParameter(0, rk_id).executeUpdate();
            session.flush();
            tx.commit();
            result = id;
        } catch (Exception e) {
            tx.rollback();
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

    public boolean updateRuKuFei(RuKuFei ruKuFei) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            session.update(ruKuFei);
            session.flush();
            int rk_id = ruKuFei.getRk_id();
            String updateRuKu = "update ruku set yfje = ifnull((select sum(ifnull(f.je,0)) from rukufei f where f.rk_id = ?),0) where ruku.id=?";
            session.createSQLQuery(updateRuKu).setParameter(0, rk_id).setParameter(1, rk_id).executeUpdate();
            session.flush();
            updateRuKu = "update ruku set dfje = je - yfje where id=?";
            session.createSQLQuery(updateRuKu).setParameter(0, rk_id).executeUpdate();
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
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

    public List<RuKuFei> queryRuKuFeisByPage(HashMap map) {
        List<RuKuFei> result = new ArrayList();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {rkf.*},a01.mc as skrmc from RuKuFei rkf "
                    + "left join A01 a01 on rkf.skr_id=a01.id "
                    + "where rkf.rk_id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, map.get("rk_id"));
            navtiveSQL.addEntity("rkf", RuKuFei.class).addScalar("skrmc", StandardBasicTypes.STRING);
            navtiveSQL.setFirstResult(Integer.parseInt(map.get("beginRow").toString()));
            navtiveSQL.setMaxResults(Integer.parseInt(map.get("pageSize").toString()));
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                RuKuFei rkf = (RuKuFei) objs[0];
                String skrmc = (String) objs[1];
                rkf.setSkrmc(skrmc);
                result.add(rkf);
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
