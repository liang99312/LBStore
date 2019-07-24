/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.XiangMuFei;
import com.lb.lbstore.domain.XiangMu;
import com.lb.lbstore.domain.XiangMuDetail;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface XiangMuService {

    public XiangMu getXiangMuById(Integer id);
    
    public XiangMu getXiangMuWithDetailById(Integer id);
    
    public List<XiangMu> getAllXiangMus(Integer qy_id);
    
    public List<XiangMuDetail> getXiangMuByWzid_100(Integer wzzd_id);
    
    public boolean updateXiangMu(XiangMu xiangMu);
    
    public boolean dealXiangMu(XiangMu xiangMu,Integer a01_id);
    
    public XiangMu saveXiangMu(XiangMu xiangMu);
    
    public boolean deleteXiangMu(Integer id);
    
    public boolean changeXiangMuState(Integer id, Integer state);
    
    public int queryRows(HashMap map);
    
    public List<XiangMu> queryXiangMusByPage(HashMap map);
    
    public int queryFeiRows(HashMap map);
    
    public List<XiangMuFei> queryXiangMuFeisByPage(HashMap map);
    
    public XiangMuFei getXiangMuFeiById(Integer id);

     public boolean updateXiangMuFei(XiangMuFei xiangMuFei);
       
    public XiangMuFei saveXiangMuFei(XiangMuFei xiangMuFei);
    
    public boolean deleteXiangMuFei(Integer id,Integer rk_id);
    
    public XiangMuDetail getXiangMuDetailById(Integer id);
    
}
