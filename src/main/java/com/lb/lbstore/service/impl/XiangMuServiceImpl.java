/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.XiangMuDao;
import com.lb.lbstore.domain.XiangMuFei;
import com.lb.lbstore.domain.XiangMu;
import com.lb.lbstore.domain.XiangMuDetail;
import com.lb.lbstore.service.XiangMuService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("xiangMuServiceImpl")
public class XiangMuServiceImpl implements XiangMuService {

    @Autowired
    private XiangMuDao xiangMuDao;

    @Override
    public XiangMu getXiangMuById(Integer id) {
        return (XiangMu) xiangMuDao.findObjectById(XiangMu.class, id);
    }

    @Override
    public XiangMu getXiangMuWithDetailById(Integer id) {
        return xiangMuDao.getXiangMuWithDetailById(id);
    }

    @Override
    public XiangMuDetail getXiangMuDetailById(Integer id) {
        return xiangMuDao.getXiangMuDetailById(id);
    }

    @Override
    public List<XiangMu> getAllXiangMus(Integer qy_id) {
        List parameters = new ArrayList();
        parameters.add(qy_id);
        return xiangMuDao.getResult("from XiangMu xiangMu where qy_id=?", parameters.toArray());
    }

    @Override
    public boolean updateXiangMu(XiangMu xiangMu) {
        return xiangMuDao.updateXiangMu(xiangMu);
    }

    @Override
    public XiangMu saveXiangMu(XiangMu xiangMu) {
        int id = xiangMuDao.saveXiangMu(xiangMu);
        return (XiangMu) xiangMuDao.findObjectById(XiangMu.class, id);
    }

    @Override
    public boolean deleteXiangMu(Integer id) {
        return xiangMuDao.deleteXiangMu(id);
    }

    @Override
    public int queryRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String sql = "select count(1) from XiangMu where qy_id=?";
        if (map.containsKey("mc")) {
            sql += " and mc like ?";
            parameters.add("%" + map.get("mc") + "%");
        }
        if (map.containsKey("lsh")) {
            sql += " and lsh like ?";
            parameters.add("%" + map.get("lsh") + "%");
        }
        if (map.containsKey("wz")) {
            sql += " and wz like ?";
            parameters.add("%" + map.get("wz") + "%");
        }
        if (map.containsKey("state")) {
            sql += " and state = ?";
            parameters.add(map.get("state"));
        }
        if (map.containsKey("kh_id")) {
            sql += " and kh_id = ?";
            parameters.add(map.get("kh_id"));
        }
        if (map.containsKey("qrq")) {
            sql += " and kdsj >= ?";
            parameters.add(map.get("qrq"));
        }
        if (map.containsKey("zrq")) {
            sql += " and kdsj <= ?";
            parameters.add(map.get("zrq") + " 23:59:59");
        }
        return xiangMuDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<XiangMu> queryXiangMusByPage(HashMap map) {
        return xiangMuDao.queryXiangMusByPage(map);
    }

    @Override
    public boolean dealXiangMu(XiangMu xiangMu, Integer a01_id) {
        return xiangMuDao.dealXiangMu(xiangMu, a01_id);
    }

    @Override
    public List<XiangMuDetail> getXiangMuByWzid_100(Integer wzzd_id) {
        return xiangMuDao.queryXiangMuDetailTop100(wzzd_id);
    }

    @Override
    public int queryFeiRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("rk_id"));
        String sql = "select count(1) from XiangMuFei where rk_id=?";
        return xiangMuDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<XiangMuFei> queryXiangMuFeisByPage(HashMap map) {
        return xiangMuDao.queryXiangMuFeisByPage(map);
    }

    @Override
    public XiangMuFei getXiangMuFeiById(Integer id) {
        return (XiangMuFei) xiangMuDao.findObjectById(XiangMuFei.class, id);
    }

    @Override
    public boolean updateXiangMuFei(XiangMuFei xiangMuFei) {
        return xiangMuDao.updateXiangMuFei(xiangMuFei);
    }

    @Override
    public XiangMuFei saveXiangMuFei(XiangMuFei xiangMuFei) {
        int id = xiangMuDao.saveXiangMuFei(xiangMuFei);
        return (XiangMuFei) xiangMuDao.findObjectById(XiangMuFei.class, id);
    }

    @Override
    public boolean deleteXiangMuFei(Integer id, Integer rk_id) {
        return xiangMuDao.deleteXiangMuFei(id, rk_id);
    }

    @Override
    public boolean changeXiangMuState(Integer id, Integer state) {
        return xiangMuDao.changeXiangMuState(id, state);
    }

}
