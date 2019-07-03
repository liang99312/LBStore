/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.lb.lbstore.domain.XiangMuFei;
import com.lb.lbstore.domain.KuCun;
import com.lb.lbstore.domain.XiangMu;
import com.lb.lbstore.domain.XiangMuDetail;
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
public class XiangMuDao extends BaseDao {

    public XiangMu getXiangMuWithDetailById(Integer id) {
        XiangMu xiangMu = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {xm.*},kh.mc as khmc,a01.mc as kdrmc,a02.mc as sprmc from XiangMu xm "
                    + "left join KeHu kh on xm.kh_id=kh.id "
                    + "left join A01 a01 on xm.kdr_id=a01.id "
                    + "left join A01 a02 on xm.spr_id=a02.id "
                    + "where xm.id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, id);
            navtiveSQL.addEntity("xm", XiangMu.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("kdrmc", StandardBasicTypes.STRING)
                    .addScalar("sprmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            List<XiangMu> list_xm = new ArrayList();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                XiangMu xm = (XiangMu) objs[0];
                String khmc = (String) objs[1];
                String kdrmc = (String) objs[2];
                String sprmc = (String) objs[3];
                xm.setKhmc(khmc);
                xm.setKdrmc(kdrmc);
                xm.setSprmc(sprmc);
                list_xm.add(xm);
            }
            if (list_xm.isEmpty()) {
                return null;
            }
            xiangMu = list_xm.get(0);

            String sql_d = "select {d.*},l.mc as wzlb from XiangMuDetail d left join WuZiLeiBie l on d.wzlb_id=l.id where d.xm_id=?";
            SQLQuery navtiveSQL_d = session.createSQLQuery(sql_d);
            navtiveSQL_d.setParameter(0, id);
            navtiveSQL_d.addEntity("d", XiangMuDetail.class).addScalar("wzlb", StandardBasicTypes.STRING);
            List<XiangMuDetail> details = new ArrayList();
            List list_d = navtiveSQL_d.list();
            for (Object obj : list_d) {
                Object[] objs = (Object[]) obj;
                XiangMuDetail xmd = (XiangMuDetail) objs[0];
                String wzlb = (String) objs[1];
                xmd.setWzlb(wzlb);
                details.add(xmd);
            }
            xiangMu.setDetails(details);
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
        return xiangMu;
    }

    public XiangMuDetail getXiangMuDetailById(Integer id) {
        XiangMuDetail xiangMuDetail = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {xmd.*},kh.mc as khmc,xm.spsj as sj,xm.lsh as lsh,a01.mc as kdrmc,l.mc as wzlb from XiangMuDetail xmd "
                    + "left join XiangMu xm on xmd.xm_id=xm.id "
                    + "left join KeHu kh on xm.kh_id=kh.id "
                    + "left join A01 a01 on xm.rkr_id=a01.id "
                    + "left join WuZiLeiBie l on xmd.wzlb_id=l.id "
                    + "where xmd.id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, id);
            navtiveSQL.addEntity("xmd", XiangMuDetail.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("sj", StandardBasicTypes.DATE)
                    .addScalar("lsh", StandardBasicTypes.STRING)
                    .addScalar("kdrmc", StandardBasicTypes.STRING)
                    .addScalar("wzlb", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                xiangMuDetail = (XiangMuDetail) objs[0];
                String khmc = (String) objs[1];
                Date sj = (Date) objs[2];
                String lsh = (String) objs[3];
                String kdrmc = (String) objs[4];
                String wzlb = (String) objs[5];
                xiangMuDetail.setKhmc(khmc);
                xiangMuDetail.setSj(sj);
                xiangMuDetail.setLsh(lsh);
                xiangMuDetail.setKdrmc(kdrmc);
                xiangMuDetail.setWzlb(wzlb);
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
        return xiangMuDetail;
    }

    public List<XiangMuDetail> queryXiangMuDetailTop100(Integer wzzd_id) {
        List<XiangMuDetail> details = new ArrayList<>();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql_d = "select {d.*},l.mc as wzlb from XiangMuDetail d left join WuZiLeiBie l on d.wzlb_id=l.id where d.wzzd_id=? order by d.id desc limit 0,100";
            SQLQuery navtiveSQL_d = session.createSQLQuery(sql_d);
            navtiveSQL_d.setParameter(0, wzzd_id);
            navtiveSQL_d.addEntity("d", XiangMuDetail.class).addScalar("wzlb", StandardBasicTypes.STRING);
            List list_d = navtiveSQL_d.list();
            for (Object obj : list_d) {
                Object[] objs = (Object[]) obj;
                XiangMuDetail xmd = (XiangMuDetail) objs[0];
                String wzlb = (String) objs[1];
                xmd.setWzlb(wzlb);
                details.add(xmd);
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

    public List<XiangMu> queryXiangMusByPage(HashMap map) {
        List<XiangMu> result = new ArrayList();
        Session session = null;
        try {
            List parameters = new ArrayList();
            parameters.add(map.get("qy_id"));
            session = getSessionFactory().openSession();
            String sql = "select {xm.*},kh.mc as khmc,ck.mc as ckmc from XiangMu xm "
                    + "left join KeHu kh on xm.kh_id=kh.id "
                    + "where xm.qy_id=?";
            if (map.containsKey("ck_id")) {
                sql += " and xm.ck_id = ?";
                parameters.add(map.get("ck_id"));
            }
            if (map.containsKey("lsh")) {
                sql += " and xm.lsh like ?";
                parameters.add("%" + map.get("lsh") + "%");
            }
            if (map.containsKey("wz")) {
                sql += " and xm.wz like ?";
                parameters.add("%" + map.get("wz") + "%");
            }
            if (map.containsKey("state")) {
                sql += " and xm.state = ?";
                parameters.add(map.get("state"));
            }
            if (map.containsKey("kh_id")) {
                sql += " and xm.kh_id = ?";
                parameters.add(map.get("kh_id"));
            }
            if (map.containsKey("gys_id")) {
                sql += " and xm.gys_id = ?";
                parameters.add(map.get("gys_id"));
            }
            if (map.containsKey("qrq")) {
                sql += " and xm.sj >= ?";
                parameters.add(map.get("qrq"));
            }
            if (map.containsKey("zrq")) {
                sql += " and xm.sj <= ?";
                parameters.add(map.get("zrq") + " 23:59:59");
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
            navtiveSQL.addEntity("xm", XiangMu.class)
                    .addScalar("khmc", StandardBasicTypes.STRING);
            navtiveSQL.setFirstResult(Integer.parseInt(map.get("beginRow").toString()));
            navtiveSQL.setMaxResults(Integer.parseInt(map.get("pageSize").toString()));
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                XiangMu xm = (XiangMu) objs[0];
                String khmc = (String) objs[1];
                String gysmc = (String) objs[2];
                String ckmc = (String) objs[3];
                xm.setKhmc(khmc);
                result.add(xm);
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

    public Integer saveXiangMu(XiangMu xiangMu) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            xiangMu.setDfje(xiangMu.getJe() - xiangMu.getYfje());
            Integer id = (Integer) session.save(xiangMu);
            session.flush();
            for (XiangMuDetail detail : xiangMu.getDetails()) {
                Integer zd_id = detail.getWzzd_id();
                if (detail.getWzzd_id() < 1) {
                    List tempList = session.createQuery("from WuZiZiDian where mc=? and bm=?")
                            .setParameter(0, detail.getWzmc()).setParameter(1, detail.getWzbm())
                            .list();
                    WuZiZiDian zd = null;
                    if (tempList.isEmpty() || tempList.get(0) == null) {
                        zd = new WuZiZiDian();
                        zd.setDw(detail.getDw());
                        zd.setMc(detail.getWzmc());
                        zd.setBm(detail.getWzbm());
                        zd.setQy_id(xiangMu.getQy_id());
                        zd.setState(0);
                        zd.setWzlb_id(detail.getWzlb_id());
                        zd_id = (Integer) session.save(zd);
                        session.flush();
                    } else {
                        zd = (WuZiZiDian) tempList.get(0);
                        zd_id = zd.getId();
                    }
                    detail.setWzzd_id(zd_id);
                }
                Integer xhgg_id = detail.getXhgg_id();
                if (detail.getXhgg_id() < 1) {
                    List tempList = session.createQuery("from WuZiXhgg where wzzd_id=? and mc=?")
                            .setParameter(0, zd_id).setParameter(1, detail.getXhgg())
                            .list();
                    WuZiXhgg xhgg = null;
                    if (tempList.isEmpty() || tempList.get(0) == null) {
                        xhgg = new WuZiXhgg();
                        xhgg.setBzq(0);
                        xhgg.setMc(detail.getXhgg());
                        xhgg.setQy_id(xiangMu.getQy_id());
                        xhgg.setWzzd_id(zd_id);
                        xhgg_id = (Integer) session.save(xhgg);
                        session.flush();
                    }else{
                        xhgg = (WuZiXhgg) tempList.get(0);
                        xhgg_id = xhgg.getId();
                    }
                    detail.setXhgg_id(xhgg_id);
                }

                detail.setKh_id(xiangMu.getKh_id());
                detail.setQy_id(xiangMu.getQy_id());
                detail.setXm_id(id);
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

    public boolean updateXiangMu(XiangMu xiangMu) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            xiangMu.setDfje(xiangMu.getJe() - xiangMu.getYfje());
            session.update(xiangMu);
            session.flush();
            String deleteDetail = "delete from XiangMuDetail where xm_id=?";
            session.createSQLQuery(deleteDetail).setParameter(0, xiangMu.getId()).executeUpdate();
            session.flush();
            for (XiangMuDetail detail : xiangMu.getDetails()) {
                Integer zd_id = detail.getWzzd_id();
                if (detail.getWzzd_id() < 1) {
                    List tempList = session.createQuery("from WuZiZiDian where mc=? and bm=?")
                            .setParameter(0, detail.getWzmc()).setParameter(1, detail.getWzbm())
                            .list();
                    WuZiZiDian zd = null;
                    if (tempList.isEmpty() || tempList.get(0) == null) {
                        zd = new WuZiZiDian();
                        zd.setDw(detail.getDw());
                        zd.setMc(detail.getWzmc());
                        zd.setBm(detail.getWzbm());
                        zd.setQy_id(xiangMu.getQy_id());
                        zd.setState(0);
                        zd.setWzlb_id(detail.getWzlb_id());
                        zd_id = (Integer) session.save(zd);
                        session.flush();
                    } else {
                        zd = (WuZiZiDian) tempList.get(0);
                        zd_id = zd.getId();
                    }
                    detail.setWzzd_id(zd_id);
                }
                Integer xhgg_id = detail.getXhgg_id();
                if (detail.getXhgg_id() < 1) {
                    List tempList = session.createQuery("from WuZiXhgg where wzzd_id=? and mc=?")
                            .setParameter(0, zd_id).setParameter(1, detail.getXhgg())
                            .list();
                    WuZiXhgg xhgg = null;
                    if (tempList.isEmpty() || tempList.get(0) == null) {
                        xhgg = new WuZiXhgg();
                        xhgg.setBzq(0);
                        xhgg.setMc(detail.getXhgg());
                        xhgg.setQy_id(xiangMu.getQy_id());
                        xhgg.setWzzd_id(zd_id);
                        xhgg_id = (Integer) session.save(xhgg);
                        session.flush();
                    }else{
                        xhgg = (WuZiXhgg) tempList.get(0);
                        xhgg_id = xhgg.getId();
                    }
                    detail.setXhgg_id(xhgg_id);
                }

                detail.setKh_id(xiangMu.getKh_id());
                detail.setQy_id(xiangMu.getQy_id());
                detail.setXm_id(xiangMu.getId());
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

    public boolean deleteXiangMu(Integer id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteDetail = "delete from XiangMuDetail where xm_id=?";
            session.createSQLQuery(deleteDetail).setParameter(0, id).executeUpdate();
            String deleteXm = "delete from XiangMu where id=?";
            session.createSQLQuery(deleteXm).setParameter(0, id).executeUpdate();
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

    public boolean dealXiangMu(XiangMu xiangMu, Integer a01_id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String sql = "from XiangMuDetail where xm_id=?";
            List<XiangMuDetail> list = session.createQuery(sql).setParameter(0, xiangMu.getId()).list();
            for (XiangMuDetail d : list) {
                XiangMuDetail detail = null;
                for (XiangMuDetail e : xiangMu.getDetails()) {
                    if (Objects.equals(e.getId(), d.getId())) {
                        detail = e;
                        break;
                    }
                }
                if (detail == null) {
                    continue;
                }
                d.setDj(detail.getDj());
                session.update(d);
            }
            session.flush();
            xiangMu = (XiangMu) session.load(XiangMu.class, xiangMu.getId());
            xiangMu.setState(1);
            xiangMu.setSpr_id(a01_id);
            xiangMu.setSpsj(new Date());
            xiangMu.setLsh(LshUtil.getXmdLsh());
            xiangMu.setDfje(xiangMu.getJe() - xiangMu.getYfje());
            session.update(xiangMu);
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

    public boolean deleteXiangMuFei(Integer id, Integer xm_id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteFei = "delete from XiangMuFei where id=?";
            session.createSQLQuery(deleteFei).setParameter(0, id).executeUpdate();
            session.flush();
            String updateXiangMu = "update xiangmu set yfje = ifnull((select sum(ifnull(f.je,0)) from xiangmufei f where f.xm_id = ?),0) where xiangmu.id=?";
            session.createSQLQuery(updateXiangMu).setParameter(0, xm_id).setParameter(1, xm_id).executeUpdate();
            session.flush();
            updateXiangMu = "update xiangmu set dfje = je - yfje where id=?";
            session.createSQLQuery(updateXiangMu).setParameter(0, xm_id).executeUpdate();
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

    public Integer saveXiangMuFei(XiangMuFei xiangMuFei) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            Integer id = (Integer) session.save(xiangMuFei);
            session.flush();
            int xm_id = xiangMuFei.getXm_id();
            String updateXiangMu = "update xiangmu set yfje = ifnull((select sum(ifnull(f.je,0)) from xiangmufei f where f.xm_id =?),0) where xiangmu.id=?";
            session.createSQLQuery(updateXiangMu).setParameter(0, xm_id).setParameter(1, xm_id).executeUpdate();
            session.flush();
            updateXiangMu = "update xiangmu set dfje = je - yfje where id=?";
            session.createSQLQuery(updateXiangMu).setParameter(0, xm_id).executeUpdate();
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

    public boolean updateXiangMuFei(XiangMuFei xiangMuFei) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            session.update(xiangMuFei);
            session.flush();
            int xm_id = xiangMuFei.getXm_id();
            String updateXiangMu = "update xiangmu set yfje = ifnull((select sum(ifnull(f.je,0)) from xiangmufei f where f.xm_id = ?),0) where xiangmu.id=?";
            session.createSQLQuery(updateXiangMu).setParameter(0, xm_id).setParameter(1, xm_id).executeUpdate();
            session.flush();
            updateXiangMu = "update xiangmu set dfje = je - yfje where id=?";
            session.createSQLQuery(updateXiangMu).setParameter(0, xm_id).executeUpdate();
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

    public List<XiangMuFei> queryXiangMuFeisByPage(HashMap map) {
        List<XiangMuFei> result = new ArrayList();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {xmf.*},a01.mc as skrmc from XiangMuFei xmf "
                    + "left join A01 a01 on xmf.skr_id=a01.id "
                    + "where xmf.xm_id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, map.get("xm_id"));
            navtiveSQL.addEntity("xmf", XiangMuFei.class).addScalar("skrmc", StandardBasicTypes.STRING);
            navtiveSQL.setFirstResult(Integer.parseInt(map.get("beginRow").toString()));
            navtiveSQL.setMaxResults(Integer.parseInt(map.get("pageSize").toString()));
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                XiangMuFei xmf = (XiangMuFei) objs[0];
                String skrmc = (String) objs[1];
                xmf.setSkrmc(skrmc);
                result.add(xmf);
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
