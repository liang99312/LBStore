/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.lb.lbstore.domain.KuCun;
import com.lb.lbstore.domain.FaHuo;
import com.lb.lbstore.domain.FaHuoDetail;
import com.lb.lbstore.domain.FaHuoFei;
import com.lb.lbstore.domain.WuZiXhgg;
import com.lb.lbstore.domain.WuZiZiDian;
import com.lb.lbstore.util.LshUtil;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Objects;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

@Repository
public class FaHuoDao extends BaseDao {

    public FaHuo getFaHuoDetailById(Integer id) {
        FaHuo faHuo = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {fh.*},kh.mc as khmc,ck.mc as ckmc,a01.mc as fhrmc,a02.mc as sprmc from FaHuo fh "
                    + "left join CangKu ck on fh.ck_id=ck.id "
                    + "left join KeHu kh on fh.kh_id=kh.id "
                    + "left join A01 a01 on fh.fhr_id=a01.id "
                    + "left join A01 a02 on fh.spr_id=a02.id "
                    + "where fh.id=" + id;
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.addEntity("fh", FaHuo.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("fhrmc", StandardBasicTypes.STRING)
                    .addScalar("sprmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            List<FaHuo> list_fh = new ArrayList();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                FaHuo fh = (FaHuo) objs[0];
                String khmc = (String) objs[1];
                String ckmc = (String) objs[2];
                String fhrmc = (String) objs[3];
                String sprmc = (String) objs[4];
                fh.setKhmc(khmc);
                fh.setCkmc(ckmc);
                fh.setFhrmc(fhrmc);
                fh.setSprmc(sprmc);
                list_fh.add(fh);
            }
            if (list_fh.isEmpty()) {
                return null;
            }
            faHuo = list_fh.get(0);

            String sql_d = "select {d.*},l.mc as wzlb from FaHuoDetail d left join WuZiLeiBie l on d.wzlb_id=l.id where d.fh_id=" + id;
            SQLQuery navtiveSQL_d = session.createSQLQuery(sql_d);
            navtiveSQL_d.addEntity("d", FaHuoDetail.class).addScalar("wzlb", StandardBasicTypes.STRING);
            List<FaHuoDetail> details = new ArrayList();
            List list_d = navtiveSQL_d.list();
            for (Object obj : list_d) {
                Object[] objs = (Object[]) obj;
                FaHuoDetail fhd = (FaHuoDetail) objs[0];
                String wzlb = (String) objs[1];
                fhd.setWzlb(wzlb);
                details.add(fhd);
            }
            faHuo.setDetails(details);
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
        return faHuo;
    }

    public List<FaHuo> queryFaHuosByPage(HashMap map) {
        List<FaHuo> result = new ArrayList();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {fh.*},kh.mc as khmc,ck.mc as ckmc from FaHuo fh "
                    + "left join CangKu ck on fh.ck_id=ck.id left join KeHu kh on fh.kh_id=kh.id "
                    + "where fh.qy_id=" + map.get("qy_id");
            if (map.containsKey("mc")) {
                sql += " and fh.wz like '%" + map.get("mc") + "%'";
            }
            if (map.containsKey("state")) {
                sql += " and fh.state = " + map.get("state");
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.addEntity("fh", FaHuo.class).addScalar("khmc", StandardBasicTypes.STRING).addScalar("ckmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                FaHuo fh = (FaHuo) objs[0];
                String khmc = (String) objs[1];
                String ckmc = (String) objs[2];
                fh.setKhmc(khmc);
                fh.setCkmc(ckmc);
                result.add(fh);
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

    public Integer saveFaHuo(FaHuo faHuo) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            Integer id = (Integer) session.save(faHuo);
            session.flush();
            for (FaHuoDetail detail : faHuo.getDetails()) {
                Integer zd_id = detail.getWzzd_id();
                if (detail.getWzzd_id() < 1) {
                    WuZiZiDian zd = new WuZiZiDian();
                    zd.setDw(detail.getDw());
                    zd.setMc(detail.getWzmc());
                    zd.setQy_id(faHuo.getQy_id());
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
                    xhgg.setQy_id(faHuo.getQy_id());
                    xhgg.setWzzd_id(zd_id);
                    xhgg_id = (Integer) session.save(xhgg);
                    session.flush();
                    detail.setXhgg_id(xhgg_id);
                }

                detail.setCk_id(faHuo.getCk_id());
                detail.setKh_id(faHuo.getKh_id());
                detail.setQy_id(faHuo.getQy_id());
                detail.setFh_id(id);
                detail.setDh(faHuo.getDh());
                if ("pt".equals(detail.getJlfs())) {
                    detail.setSlzl(detail.getSll());
                }
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

    public boolean updateFaHuo(FaHuo faHuo) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            session.update(faHuo);
            session.flush();
            String deleteDetail = "delete from FaHuoDetail where fh_id=" + faHuo.getId();
            session.createSQLQuery(deleteDetail).executeUpdate();
            session.flush();
            for (FaHuoDetail detail : faHuo.getDetails()) {
                Integer zd_id = detail.getWzzd_id();
                if (detail.getWzzd_id() < 1) {
                    WuZiZiDian zd = new WuZiZiDian();
                    zd.setDw(detail.getDw());
                    zd.setMc(detail.getWzmc());
                    zd.setQy_id(faHuo.getQy_id());
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
                    xhgg.setQy_id(faHuo.getQy_id());
                    xhgg.setWzzd_id(zd_id);
                    xhgg_id = (Integer) session.save(xhgg);
                    session.flush();
                    detail.setXhgg_id(xhgg_id);
                }

                detail.setCk_id(faHuo.getCk_id());
                detail.setKh_id(faHuo.getKh_id());
                detail.setQy_id(faHuo.getQy_id());
                detail.setFh_id(faHuo.getId());
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

    public boolean deleteFaHuo(Integer id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteDetail = "delete from FaHuoDetail where fh_id=" + id;
            session.createSQLQuery(deleteDetail).executeUpdate();
            String deleteFei = "delete from FaHuoFei where fh_id=" + id;
            session.createSQLQuery(deleteFei).executeUpdate();
            String deleteLl = "delete from FaHuo where id=" + id;
            session.createSQLQuery(deleteLl).executeUpdate();
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

    public boolean dealFaHuo(FaHuo faHuo, Integer a01_id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String sql = "from FaHuoDetail where fh_id=" + faHuo.getId();
            List<FaHuoDetail> list = session.createQuery(sql).list();
            Hashtable<Integer, FaHuoDetail> detailTable = new Hashtable();
            StringBuilder sb = new StringBuilder();
            sb.append("(-1");
            for (FaHuoDetail e : faHuo.getDetails()) {
                detailTable.put(e.getKc_id(), e);
                sb.append(",");
                sb.append(e.getKc_id());
            }
            sb.append(")");
            String kcSql = "from KuCun where id in " + sb.toString();
            List<KuCun> kcList = session.createQuery(kcSql).list();
            for (KuCun kc : kcList) {
                FaHuoDetail detail = detailTable.get(kc.getId());
                if (detail != null) {
                    if (kc.getSyzl() < detail.getSlzl()) {
                        tx.rollback();
                        result = false;
                        return result;
                    }
                    kc.setSyzl(kc.getSyzl() - detail.getSlzl());
                    kc.setSyl(kc.getSyl() - detail.getSll());
                    if (detail.getDymx() != null && !"".equals(detail.getDymx())) {
                        JSONArray detailDymx = JSONArray.parseArray(detail.getDymx());
                        JSONArray kcDymx = JSONArray.parseArray(kc.getDymx());
                        List<Integer> dxIds = new ArrayList();
                        for (int i = 0; i < detailDymx.size(); i++) {
                            JSONObject d = detailDymx.getJSONObject(i); // 遍历 jsonarray 数组，把每一个对象转成 json 对象
                            dxIds.add(d.getIntValue("id"));
                        }
                        for (int i = 0; i < kcDymx.size(); i++) {
                            JSONObject k = kcDymx.getJSONObject(i); // 遍历 jsonarray 数组，把每一个对象转成 json 对象
                            int id = k.getIntValue("id");
                            if (dxIds.contains(id)) {
                                k.remove("state");
                                k.put("state", 1);
                            }
                        }
                        System.out.println(kcDymx.toJSONString());
                        kc.setDymx(kcDymx.toJSONString());
                    }
                    //处理库存
                    session.save(kc);
                }
            }
            session.flush();
            faHuo = (FaHuo) session.load(FaHuo.class, faHuo.getId());
            faHuo.setState(1);
            faHuo.setSpr_id(a01_id);
            faHuo.setSpsj(new Date());
            faHuo.setLsh(LshUtil.getLldLsh());
            session.update(faHuo);
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

    public boolean deleteFaHuoFei(Integer id, Integer fh_id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteFei = "delete from FaHuoFei where id=" + id;
            session.createSQLQuery(deleteFei).executeUpdate();
            session.flush();
            String updateFaHuo = "update fahuo set yfje = (select sum(f.je) from fahuofei f where f.fh_id = " + fh_id + ") where fahuo.id=" + fh_id;
            session.createSQLQuery(updateFaHuo).executeUpdate();
            session.flush();
            updateFaHuo = "update fahuo set dfje = je - yfje where id=" + fh_id;
            session.createSQLQuery(updateFaHuo).executeUpdate();
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
    
    public Integer saveFaHuoFei(FaHuoFei faHuoFei) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            Integer id = (Integer) session.save(faHuoFei);
            session.flush();
            int fh_id = faHuoFei.getFh_id();
            String updateFaHuo = "update fahuo set yfje = (select sum(f.je) from fahuofei f where f.fh_id = " + fh_id + ") where fahuo.id=" + fh_id;
            session.createSQLQuery(updateFaHuo).executeUpdate();
            session.flush();
            updateFaHuo = "update fahuo set dfje = je - yfje where id=" + fh_id;
            session.createSQLQuery(updateFaHuo).executeUpdate();
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
    
    public boolean updateFaHuoFei(FaHuoFei faHuoFei) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            session.update(faHuoFei);
            session.flush();
            int fh_id = faHuoFei.getFh_id();
            String updateFaHuo = "update fahuo set yfje = (select sum(f.je) from fahuofei f where f.fh_id = " + fh_id + ") where fahuo.id=" + fh_id;
            session.createSQLQuery(updateFaHuo).executeUpdate();
            session.flush();
            updateFaHuo = "update fahuo set dfje = je - yfje where id=" + fh_id;
            session.createSQLQuery(updateFaHuo).executeUpdate();
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
}
